import { Injectable } from '@angular/core';
import { BeaconRegion, IBeacon, IBeaconDelegate } from '@ionic-native/ibeacon';
import { Observable } from 'rxjs/Observable';
import { Beacon } from '../beacons-storage/beacons-storage';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NearFinderProvider {
  private beaconRegion: BeaconRegion;
  private delegate: IBeaconDelegate;

  private devices: Subject<any>;

  constructor(
    private ibeacon: IBeacon
  ) {
    this.devices = new Subject();
  }

  public start(): Observable<any> {
    this.beaconRegion = this.ibeacon.BeaconRegion('nearby', 'b9407f30-f5f8-466e-aff9-25556b57fe6d');

    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();

    this.delegate = this.ibeacon.Delegate();

    this.ibeacon.startMonitoringForRegion(this.beaconRegion);

    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => console.log('startRangingBeaconsInRegion: ' + this.beaconRegion.identifier))
      .catch(console.error);

    this.delegate.didRangeBeaconsInRegion().subscribe(
      data => data.beacons.forEach(beacon => this.devices.next(beacon)),
      error => console.error()
    );

    return this.devices.asObservable();
  }

  public stop() {
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    this.ibeacon.stopMonitoringForRegion(this.beaconRegion);
  }

}
