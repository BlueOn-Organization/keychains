import { Component, Input } from '@angular/core';
import { Beacon } from '../../providers/beacons-storage/beacons-storage';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'beacon',
  templateUrl: 'beacon.html'
})
export class BeaconComponent {

  @Input() device: Beacon;

  constructor(private storage: BeaconsStorage, public navCtrl: NavController) {}

  buscar() {
    this.navCtrl.push('SearchPage', {beacon: this.device})
  }

  editar() {
    this.navCtrl.push('DeviceSettingsPage', {beacon: this.device, edit: true})
  }

  borrar() {
    if(confirm('Esta a punto de eliminar un dispositivo!!')) {
      this.storage.delete(this.device);
    }
  }

}
