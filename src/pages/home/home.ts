import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import { PopoverController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';

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
    private beaconsStorage: BeaconsStorage
  ) {}

  ionViewDidLoad() {
      this.checkBluetoothEnabled();
  }

  checkBluetoothEnabled() {
    this.ibeacon.isBluetoothEnabled().then(enabled => {
      if (enabled) {
        this.beaconsStorage.load();
      } else {
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
    this.navCtrl.push('DeviceListPage');
  }

  tutorial(){
    this.navCtrl.setRoot('IntroPage');
  }

  logout(){
    this.afAuth.auth.signOut().then(x=>{
      this.storage.set('introShown', false);
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
