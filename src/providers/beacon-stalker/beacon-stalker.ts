import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beacon } from '../../app/beacon.model';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BeaconsStorage } from '../beacons-storage/beacons-storage';
import { BeaconMonitorProvider } from '../beacon-monitor/beacon-monitor';

/*
  Generated class for the BeaconStalkerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeaconStalkerProvider {
  beacons: Beacon[];
  beacon_watching: boolean;

  constructor(
    private localNotifications: LocalNotifications,
    private storage: Storage,
    private finder: BeaconMonitorProvider,
    beaconStorage: BeaconsStorage,
  ) {
    this.beacons = beaconStorage.list;
  }

  watch() {
    this.beacons.forEach((beacon, index) => this.findDevice(beacon, index))
  }

  findDevice(beacon: Beacon, index: number) {
    this.storage.get('beacon-watching').then(enabled => {
      if (enabled) {
        let negativecontroller = 0;
        let counter = 0;

        const sub = this.finder.search(beacon).subscribe(distance => {
          if (distance < 0) negativecontroller++;
          counter++

          if (counter == 10) {
            this.finder.stop()
            sub.unsubscribe();

            if (negativecontroller == 10) this.showNotification(beacon, index + 1);

            setTimeout(() => this.findDevice(beacon, index), beacon.tick * 1000);
          }
        });
      }
    });
  }

  showNotification(beacon: Beacon, index: number) {
    setInterval(() =>
      this.localNotifications.schedule({
        id: index,
        text: `${beacon.nombre} fuera de rango.`,
        data: beacon
      }), 5000);

    this.localNotifications.on('click')
      .subscribe((data) => {
        console.log(data)
      });
  }
}
