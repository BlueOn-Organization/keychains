import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { Beacon } from '../../app/beacon.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  saved_devices: Beacon[] = []

  constructor(public navCtrl: NavController, private storage: BeaconsStorage) {}

  ionViewDidLoad() {
    this.storage.loadStorage().then((beacons) => this.saved_devices = beacons )
  }

  add() {
    let beacon = <Beacon>{};
    this.navCtrl.push('BleListPage');
  }

}
