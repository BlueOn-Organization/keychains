import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Beacon, BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';

@IonicPage()
@Component({
  selector: 'page-device-settings',
  templateUrl: 'device-settings.html',
})
export class DeviceSettingsPage {
  create: boolean;
  edit: boolean;
  device: Beacon;
  aux_copy_device: Beacon;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    private storage: BeaconsStorage
  ) {
    this.create = navParams.get('new');
    this.edit = navParams.get('edit');
    this.device = navParams.get('beacon');
    this.aux_copy_device = Object.assign({}, this.device);
  }

  guardar() {
    this.storage.save(this.device);
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    if (confirm('Cualquier cambio realizado se perdera!!')) {
      this.device = this.aux_copy_device;
      this.storage.loadStorage().then(() => this.navCtrl.pop());
    }
  }

}
