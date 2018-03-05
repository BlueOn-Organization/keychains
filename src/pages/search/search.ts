import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IBeacon, BeaconRegion } from '@ionic-native/ibeacon';
import { BLE } from '@ionic-native/ble';
import { Beacon } from '../../providers/beacons-storage/beacons-storage';
import { FinderProvider } from '../../providers/finder/finder';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  distance: number = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public finder: FinderProvider,
    public ngzone: NgZone
  ) { }

  ionViewDidLoad() {
    const beacon = <Beacon>this.navParams.get('beacon');

    // this.finder.start(beacon).subscribe(distance => {
    //   this.ngzone.run(() => {
    //     this.distance = distance;
    //   });
    // });

  }

  ionViewWillLeave() {
    // this.finder.stop();
  }

}
