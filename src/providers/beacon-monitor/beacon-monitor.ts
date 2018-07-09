import { Injectable } from '@angular/core';
import { BeaconRegion, IBeacon, IBeaconDelegate, IBeaconPluginResult } from '@ionic-native/ibeacon';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Beacon } from '../../app/beacon.model';

@Injectable()
export class BeaconMonitorProvider {
  private beaconRegion: BeaconRegion;
  // private delegate: IBeaconDelegate;
  private uuid: string = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';

  private distance: Subject<number>;

  constructor(
    private ibeacon: IBeacon
  ) {
    this.distance = new Subject();
    this.beaconRegion = this.ibeacon.BeaconRegion('blue-on', this.uuid);
  }

  public search(beacon: Beacon): Observable<number> {
    this.start().subscribe(
      data => {
        const found = data.beacons.find(b => b.major == beacon.major && b.minor == beacon.minor)
        this.distance.next(found ? found.accuracy : -1)
      },
      error => console.error()
    );

    return this.distance.asObservable();
  }

  private start(): Observable<IBeaconPluginResult> {
    this.ibeacon.requestAlwaysAuthorization();

    const delegate = this.ibeacon.Delegate();

    this.ibeacon.startMonitoringForRegion(this.beaconRegion);

    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => console.log('startRangingBeaconsInRegion: ' + this.beaconRegion.identifier))
      .catch(console.error);

    return delegate.didRangeBeaconsInRegion();
  }

  public stop() {
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    this.ibeacon.stopMonitoringForRegion(this.beaconRegion);
  }

}
