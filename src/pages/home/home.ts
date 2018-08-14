import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { Beacon } from '../../app/beacon.model';
import { IBeacon } from '@ionic-native/ibeacon';
import { PopoverController } from 'ionic-angular';
import {ContentPopoverComponent} from "../../components/content-popover/content-popover";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {DeviceListPage} from "../device-list/device-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    public navCtrl: NavController,
    private ibeacon: IBeacon,
    public storage: Storage,
    private alert: AlertController,
    public popoverCtrl: PopoverController,
    private afAuth: AngularFireAuth,
  ) {}



  ionViewDidLoad() {
      this.checkBluetoothEnabled();
  }


  checkBluetoothEnabled() {
    this.ibeacon.isBluetoothEnabled().then(enabled => {
      if (!enabled) {
        this.alert.create({
          enableBackdropDismiss: false,
          subTitle: 'El Bluetooth está desactivado, debes activarlo para poder continuar.',
          buttons: [{
            text: 'Verificar',
            role: 'cancel',
            handler: () => this.checkBluetoothEnabled()
          }]
        }).present();

      }
    });
  }




  add() {
    this.navCtrl.push('NewDevicePage');
  }

  search() {
    this.navCtrl.push('NewDeviceListPage');
  }

  device(){
    this.navCtrl.push(DeviceListPage);
  }

  tutorial(){
    this.navCtrl.setRoot('IntroPage');
  }

  logout(){
    this.afAuth.auth.signOut().then(x=>{
      this.storage.set('introShown', false);
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
