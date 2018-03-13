import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Beacon } from '../../app/beacon.model';

@Injectable()
export class BeaconsStorage {
  private beacons: Beacon[];
  private loaded: boolean;

  constructor(public storage: Storage) {
    this.beacons = [];
    this.loaded = false;
  }

  loadStorage(): Promise<any> {
    return this.storage.get('beacons').then(beacons => {
      this.loaded = true;
      this.beacons = beacons ? beacons : [];

      return this.beacons;
    }).catch(console.log);
  }

  get list(): Beacon[] {
    !this.loaded && console.warn('The storage has not been loaded');
    return this.beacons;
  }

  save(b: Beacon) {
    const index = this.findIndex(b.uid);
    if (index != -1) {
      this.beacons[index] = b;
    } else {
      this.beacons.push(b);
    }
    this.overrieStorage();
  }

  delete(b: Beacon) {
    const index = this.findIndex(b.uid);
    if (index != -1) {
      this.beacons.splice(index, 1);
      this.overrieStorage();
    } else {
      console.error("The device is not stored");
    }
  }

  findIndex(uid: string) {
    return this.beacons.findIndex(beacon => beacon.uid === uid);
  }

  private overrieStorage() {
    this.storage.set('beacons', this.beacons);
  }

}
