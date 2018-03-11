import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Beacon } from '../../providers/beacons-storage/beacons-storage';
import { BLE } from '@ionic-native/ble';
import { PublicitaryWatcher } from '../../providers/publicitary-watcher/publicitary-watcher';
import { NearFinderProvider } from '../../providers/near-finder/near-finder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detected_devices: any[] = [];
  detected_beacons: any[] = [];
  uuids_known: any = {};
  searching: boolean = false;

  constructor(
    public navCtrl: NavController,
    private ble: BLE,
    private publicitary: PublicitaryWatcher,
    private finder: NearFinderProvider,
    private ngzone: NgZone
  ) { }

  ionViewDidLoad() {
    this.find();
  }

  find() {
    this.searching = true;

    const finder = this.finder.start().subscribe(beacon => {
      console.log(beacon.uuid);
      if (this.uuids_known[beacon.uuid]) {
        this.ngzone.run(() => {
          this.detected_beacons[this.uuids_known[beacon.uuid]] = beacon;
        });
      } else {
        this.ngzone.run(() => {
          this.uuids_known[beacon.uuid] = this.detected_beacons.push(beacon) - 1;
        });
      }
    });

    setTimeout(() => {
      this.searching = false;
      finder.unsubscribe();
      this.finder.stop();
    }, 30000);
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
    });
  }

}
