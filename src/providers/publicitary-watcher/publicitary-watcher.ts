import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { Storage } from '@ionic/storage'
import { ModalController } from 'ionic-angular';

@Injectable()
export class PublicitaryWatcher {
  expected_id: string = 'F4:11:EA:B9:C1:84';
  private imagen: string = 'assetst/imgs/logo.png';

  constructor(public storage: Storage, public modalCtrl: ModalController) {
    this.storage.get('shown').then(shown => shown && (this.expected_id = 'none'));
  }

  public show() {
    this.storage.set('shown', true);
    this.modalCtrl.create('ModalPage', {imagen: this.imagen}).present();
  }

}
