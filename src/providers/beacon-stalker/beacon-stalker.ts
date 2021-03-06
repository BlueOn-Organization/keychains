import { Injectable } from '@angular/core';
import { Beacon } from '../../app/beacon.model';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BeaconsStorage } from '../beacons-storage/beacons-storage';
import { IBeacon, BeaconRegion } from '@ionic-native/ibeacon';

@Injectable()
export class BeaconStalkerProvider {
  private spected_beacons: Beacon[];
  private nearby_beacons: any;
  private workers: number[] = [];
  private beaconRegion: BeaconRegion;
  private uuid: string = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';
  private watching: boolean = false;

  constructor(
    private localNotifications: LocalNotifications,
    beaconStorage: BeaconsStorage,
    private ibeacon: IBeacon
  ) {
    this.spected_beacons = beaconStorage.list;
    this.nearby_beacons = {};
  }

  get isWatching() {
    return this.watching;
  }

  watch() {
    this.watching = true

    this.start().subscribe(
      data => this.checkFound(data.beacons),
      error => console.error(error)
    );

    this.spected_beacons.filter(beacon => beacon.tick > 0)
      .forEach((beacon, index) => this.findDevice(beacon, index));
  }

  unWatch() {
    this.workers.forEach(element => clearTimeout(element));
    this.workers = [];
    this.stop();
    this.localNotifications.clearAll();
    this.watching = false
  }

  private checkFound(found_beacons: any[]) {
    if(!this.watching) this.unWatch;

    for (let id in this.nearby_beacons) {
      this.nearby_beacons[id] -= 1;

      if (this.nearby_beacons[id] <= -10) delete this.nearby_beacons[id];
    }

    found_beacons.forEach(beacon => {
      this.nearby_beacons[`${beacon.major}${beacon.minor}`] = 0;
    });
  }

  private findDevice(beacon: Beacon, index: number) {

    console.log(`${beacon.nombre} is spected on ${beacon.tick}`);
    console.log('*****************************************************');

    const id = setTimeout(() => {
      if (this.watching && beacon.tick != -1) {
        if (this.nearby_beacons.hasOwnProperty(`${beacon.major}${beacon.minor}`)) {
          console.log(`${beacon.nombre} is near`);
          this.localNotifications.clear(index+1)
        } else {
          console.log(`${beacon.nombre} not found`);
          this.showNotification(beacon, index + 1);
        }

        this.findDevice(beacon, index);
      }

      this.deleteTimeout(id);

    }, (beacon.tick) * 1000);

    this.workers.push(id);
  }

  private showNotification(beacon: Beacon, index: number) {
    const options = {
      id: index,
      title: `${beacon.nombre} fuera de rango.`,
      text: 'No se pudo detectar el dispositivo',
      data: beacon,
      color: '#b3259d'
    }

    this.localNotifications.schedule(options);
  }

  private deleteTimeout(id: number) {
    const index = this.workers.indexOf(id);
    if (index != -1) {
      this.workers.splice(index, 1);
      clearTimeout(id);
    }
  }

  private start() {
    this.beaconRegion = this.ibeacon.BeaconRegion('blue-on-stalker', this.uuid);

    this.ibeacon.requestAlwaysAuthorization();

    const delegate = this.ibeacon.Delegate();

    this.ibeacon.startMonitoringForRegion(this.beaconRegion);

    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => console.log('Monitoreando dispositivos cercanos'))
      .catch(console.error);

    return delegate.didRangeBeaconsInRegion();
  }

  private stop() {
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    this.ibeacon.stopMonitoringForRegion(this.beaconRegion);
  }
}
