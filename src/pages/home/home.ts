import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Beacon } from '../../providers/beacons-storage/beacons-storage';
import { BLE } from '@ionic-native/ble';
import { PublicitaryWatcher } from '../../providers/publicitary-watcher/publicitary-watcher';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detected_devices: any[] = []
  searching: boolean = false;

  constructor(
    public navCtrl: NavController,
    private ble: BLE,
    private publicitary: PublicitaryWatcher,
    private ngzone: NgZone
  ) { }

  ionViewDidLoad() {
    this.scan();
  }

  scan() {
    this.detected_devices = [];
    this.searching = true;
    this.ble.scan([], 30)
      .subscribe(device => {
        console.log(device.id);
        if (device.id == this.publicitary.expected_id) {
          this.publicitary.show();
        } else {
          this.ngzone.run(() => this.detected_devices.push(device));
        }
      });

      setTimeout(() => {
        this.searching = false;
      }, 30000);
  }

  connect(device) {
    const conn = this.ble.connect(device.id).subscribe(response => {
      console.log(response);
      alert(JSON.stringify(response));
      this.ble.disconnect(device.id);
      conn.unsubscribe();
    }
    );
  }

}
