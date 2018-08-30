import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {BeaconsStorage} from "../../providers/beacons-storage/beacons-storage";
import {Beacon} from "../../app/beacon.model";

@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage {
  saved_devices: Beacon[] = [<Beacon>{
    nombre: 'asd'
  }];

  constructor(
    public navCtrl: NavController,
    private beaconsStorage: BeaconsStorage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceListPage');
    this.saved_devices = this.beaconsStorage.list
  }

  link(){
    window.open("http://google.com",'_system', 'location=yes');
  }

}
