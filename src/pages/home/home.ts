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
    private beaconsStorage: BeaconsStorage,
    private ibeacon: IBeacon,
    private alert: AlertController
  ) {}

  ionViewDidLoad() {
    // this.checkBluetoothEnabled();
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
