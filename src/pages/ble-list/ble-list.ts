import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

/**
 * Generated class for the BleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ble-list',
  templateUrl: 'ble-list.html',
})
export class BleListPage {

  detected_devices: any[] = []
  searching: boolean = false;

  constructor(
    public navCtrl: NavController,
    private ble: BLE,
    private ngzone: NgZone
  ) { }

  ionViewDidLoad() {
    this.scan();
  }

  ionViewWillLeave() {
    this.ble.stopScan();
    this.searching = false;
  }

  scan() {
    this.detected_devices = [];
    this.searching = true;
    this.ble.startScan([])
      .subscribe(device => {
        console.log(device.id);
        this.ngzone.run(() => this.detected_devices.push(device));
      });
  }

  connect(device) {
    const conn = this.ble.connect(device.id).subscribe(response => {
            alert(JSON.stringify(response));
      console.log(response.services);
      this.ble.disconnect(device.id);
      conn.unsubscribe();
    }
    );
  }

}
