import { Injectable } from '@angular/core';
import { Beacon } from '../../app/beacon.model';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BeaconsStorage } from '../beacons-storage/beacons-storage';
import { BeaconMonitorProvider } from '../beacon-monitor/beacon-monitor';
import { Storage } from '@ionic/storage';

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
    console.log(`Start motirong beacons [${this.beacons.length}]`);
    this.beacons.filter(beacon => beacon.tick)
      .forEach((beacon, index) => this.findDevice(beacon, index));
  }

  findDevice(beacon: Beacon, index: number) {
    this.storage.get('beacon-watching').then(enabled => {
      console.log(enabled);
      if (enabled) {
        console.log(`${beacon.nombre} is spected on ${beacon.tick}`);
        setTimeout(() => {
          let negativecontroller = 0;
          let counter = 0;

          const sub = this.finder.search(beacon).subscribe(distance => {
            if (distance < 0) negativecontroller++;
            counter++

            if (counter == 10) {
              sub.unsubscribe();
              // this.finder.stop()
              if (negativecontroller == 10) this.showNotification(beacon, index + 1);    
              this.findDevice(beacon, index);
            }
          });
        }, (beacon.tick - 10) * 1000);
      }
    });
  }

  showNotification(beacon: Beacon, index: number) {
    this.localNotifications.schedule({
      id: index,
      text: `${beacon.nombre} fuera de rango.`,
      data: beacon
    });

    this.localNotifications.on('click')
      .subscribe((data) => {
        console.log(data)
      });
  }
}
