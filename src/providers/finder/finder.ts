import { Injectable } from '@angular/core';
import { BeaconRegion, IBeacon, IBeaconDelegate } from '@ionic-native/ibeacon';
import { Observable } from 'rxjs/Observable';
import { Beacon } from '../beacons-storage/beacons-storage';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the FinderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FinderProvider {
  private beaconRegion: BeaconRegion;
  private delegate: IBeaconDelegate;

  private distance: Subject<number>;

  constructor(
    private ibeacon: IBeacon
  ) {
    this.distance = new Subject();
  }

  public start(beacon: Beacon): Observable<number> {
    this.beaconRegion = this.ibeacon.BeaconRegion(beacon.nombre, beacon.uid);

    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();

    this.delegate = this.ibeacon.Delegate();

    this.ibeacon.startMonitoringForRegion(this.beaconRegion);

    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => console.log('startRangingBeaconsInRegion: ' + this.beaconRegion.identifier))
      .catch(console.error);

    // this.ibeacon.requestStateForRegion(this.beaconRegion);

    // this.delegate.didDetermineStateForRegion().subscribe(result => {
    //   console.info('beacon state ' + result.state, result)
    //   //'CLRegionStateInside' | 'CLRegionStateOutside'
    //   if (result.state === 'CLRegionStateInside') {
        this.delegate.didRangeBeaconsInRegion().subscribe(
          data => this.distance.next(data.beacons.length ? data.beacons[0].accuracy : -1),
          error => console.error()
        );
    //   } else {
    //     this.stop();
    //     this.distance.next(-1);
    //   }
    // });

    return this.distance.asObservable();
  }

  public stop() {
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    this.ibeacon.stopMonitoringForRegion(this.beaconRegion);
  }

}
