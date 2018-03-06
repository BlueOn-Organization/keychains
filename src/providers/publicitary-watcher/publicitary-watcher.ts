import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { Storage } from '@ionic/storage'
import { ModalController } from 'ionic-angular';

@Injectable()
export class PublicitaryWatcher {
  private expected_id: string = 'F4:11:EA:B9:C1:84';
  private imagen: string = 'assetst/imgs/logo.png';

  constructor(private ble: BLE, public storage: Storage, public modalCtrl: ModalController) { }

  start() {
    console.log('Start PublicitaryWatcher');
    this.storage.get('shown').then(shown => {
      console.log('shown ' + (shown ? 'true' : 'false'));
      (!shown) && this.scan()}
    );
  }

  private scan() {
    this.ble.scan([], 20)
      .subscribe(device => {
        console.log(device.id);
        (device.id == this.expected_id) && this.show()
      });
  }

  private show() {
    this.storage.set('shown', true);
    this.modalCtrl.create('ModalPage', {imagen: this.imagen}).present();
  }

}
