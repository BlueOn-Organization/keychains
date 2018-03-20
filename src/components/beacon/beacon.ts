import { Component, Input } from '@angular/core';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { NavController, AlertController } from 'ionic-angular';
import { Beacon } from '../../app/beacon.model';

@Component({
  selector: 'beacon',
  templateUrl: 'beacon.html'
})
export class BeaconComponent {

  @Input() device: Beacon;

  constructor(
    private storage: BeaconsStorage,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  buscar() {
    this.navCtrl.push('SearchPage', {beacon: this.device})
  }

  editar() {
    let prompt = this.alertCtrl.create({
      title: 'Renombrar',
      subTitle: 'Ingresa e nuevo nombre del dispositivo: ',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: data => {
            if (data.name) {
              this.device.nombre = data.name
              this.storage.save(this.device);
            } else {
              return false;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  borrar() {
    this.alertCtrl.create({
      subTitle: 'Estas seguro de eliminar el dispositivo?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: data => {
            this.storage.delete(this.device);
          }
        }
      ]
    }).present();
  }

}
