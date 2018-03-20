import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { Beacon } from '../../app/beacon.model';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  saved_devices: Beacon[] = []

  constructor(
    public navCtrl: NavController,
    private storage: BeaconsStorage,
    private ibeacon: IBeacon,
    private alert: AlertController
  ) {}

  ionViewDidLoad() {
    this.checkBluetoothEnabled()
  }

  checkBluetoothEnabled() {
    this.ibeacon.isBluetoothEnabled().then(enabled => {
      if (enabled) {
        this.storage.loadStorage().then((beacons) => this.saved_devices = beacons)
      } else {
        this.alert.create({
          enableBackdropDismiss: false,
          subTitle: 'el Bluetoot esta desactivado, debes activarlo para el correcto funcionamiento de la applicacion',
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

}
