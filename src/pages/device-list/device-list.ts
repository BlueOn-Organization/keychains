import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BeaconsStorage} from "../../providers/beacons-storage/beacons-storage";
import {Beacon} from "../../app/beacon.model";

/**
 * Generated class for the DeviceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage {
  saved_devices: Beacon[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private beaconsStorage: BeaconsStorage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceListPage');
    this.getBeacons();
  }

  getBeacons() {
    this.beaconsStorage.load().then((beacons) => this.saved_devices = beacons);
  }

}
