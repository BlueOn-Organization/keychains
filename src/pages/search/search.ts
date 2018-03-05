import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IBeacon, BeaconRegion } from '@ionic-native/ibeacon';
import { BLE } from '@ionic-native/ble';
import { Beacon } from '../../providers/beacons-storage/beacons-storage';
import { Dialogs } from '@ionic-native/dialogs';
import { FinderProvider } from '../../providers/finder/finder';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  distance: number = 1;
  background: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public finder: FinderProvider,
    public ngzone: NgZone,
    private dialogs: Dialogs
  ) {
    this.background = '#2575bb';
  }

  ionViewDidLoad() {
    const beacon = <Beacon>this.navParams.get('beacon');

    this.finder.start(beacon).subscribe(distance => {
      this.ngzone.run(() => {
        if(distance < 0) {
          this.background = '#eff0f1';
        } else {
          if (distance < 1 && this.distance > 1) {
            this.dialogs.beep(1);
          }

          this.distance = distance;
        }
      });
    });

  }

  ionViewWillLeave() {
    // this.finder.stop();
  }

}
