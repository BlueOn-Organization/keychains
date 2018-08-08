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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  saved_devices: Beacon[] = []

  constructor(
    public navCtrl: NavController,
    private beaconsStorage: BeaconsStorage,
    private ibeacon: IBeacon,
    public storage: Storage,
    private alert: AlertController,
    public popoverCtrl: PopoverController,
    private afAuth: AngularFireAuth,
  ) {}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ContentPopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
      this.verifyAuth();
  }


  checkBluetoothEnabled() {
    this.ibeacon.isBluetoothEnabled().then(enabled => {
      if (enabled) {
        this.getBeacons();
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

  verifyAuth() {
    this.storage.get('introShown').then(result => {
      console.log('introShown' + result);
      if (result) {
        this.checkBluetoothEnabled();
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
  getBeacons() {
    this.beaconsStorage.load().then((beacons) => this.saved_devices = beacons);
  }

  add() {
    this.navCtrl.push('NewDevicePage');
  }

  search() {
    this.navCtrl.push('NewDeviceListPage');
  }
}
