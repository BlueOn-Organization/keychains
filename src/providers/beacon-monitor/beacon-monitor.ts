import { Injectable } from '@angular/core';
import { BeaconRegion, IBeacon, IBeaconPluginResult } from '@ionic-native/ibeacon';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Beacon } from '../../app/beacon.model';
import { BeaconStalkerProvider } from '../beacon-stalker/beacon-stalker';

@Injectable()
export class BeaconMonitorProvider {
  private beaconRegion: BeaconRegion;
  private uuid: string = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';


  constructor(
    private ibeacon: IBeacon,
    private stalker: BeaconStalkerProvider
  ) {
    this.beaconRegion = this.ibeacon.BeaconRegion('blue-on', this.uuid);
  }

  public search(beacon: Beacon): Observable<number> {
    let distance = new Subject<number>();

    this.start().subscribe(
      data => {
        const found = data.beacons.find(b => b.major == beacon.major && b.minor == beacon.minor)
        distance.next(found ? found.accuracy : -1)
      },
      error => console.error()
    );

    return distance.asObservable();
  }

  private start(): Observable<IBeaconPluginResult> {
    if (this.stalker.isWatching) this.stalker.unWatch();

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
    this.stalker.watch();
  }

}
