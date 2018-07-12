import { Injectable } from '@angular/core';
import { Beacon } from '../../app/beacon.model';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BeaconsStorage } from '../beacons-storage/beacons-storage';
import { BeaconMonitorProvider } from '../beacon-monitor/beacon-monitor';
import { Storage } from '@ionic/storage';
import { IBeacon, BeaconRegion } from '@ionic-native/ibeacon';
import { Observable } from '@firebase/util';

@Injectable()
export class BeaconStalkerProvider {
  spected_beacons: Beacon[];
  nearby_beacons: string[];

  workers: number[] = [];
  private beaconRegion: BeaconRegion;
  private uuid: string = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';

  constructor(
    private localNotifications: LocalNotifications,
    beaconStorage: BeaconsStorage,
    private ibeacon: IBeacon
  ) {
    this.spected_beacons = beaconStorage.list;
  }

  watch() {
    this.start().subscribe(
      data => this.nearby_beacons = data.beacons.map(beacon => `${beacon.major}${beacon.minor}`),
      error => console.error(error)
    );

    this.spected_beacons.filter(beacon => beacon.tick > 0)
      .forEach((beacon, index) => this.findDevice(beacon, index));
  }

  unWatch() {
    console.log(this.workers)
    this.workers.forEach(element => clearTimeout(element));
    this.workers = [];
    this.stop();
    console.log(this.workers)
  }

  private findDevice(beacon: Beacon, index: number) {
    console.log(`${beacon.nombre} is spected on ${beacon.tick}`);

    const id = setTimeout(() => {
      if (this.nearby_beacons.indexOf(`${beacon.major}${beacon.minor}`) == -1) {
        this.showNotification(beacon, index + 1);
      }

      this.findDevice(beacon, index);
      this.deleteTimeout(id);
    }, (beacon.tick) * 1000);

    this.workers.push(id);
        console.log(this.workers)
  }

  private showNotification(beacon: Beacon, index: number) {
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
      .then(() => console.log('Monitoriando dispositivos cercanos'))
      .catch(console.error);

    return delegate.didRangeBeaconsInRegion();
  }

  public stop() {
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    this.ibeacon.stopMonitoringForRegion(this.beaconRegion);
  }
}
