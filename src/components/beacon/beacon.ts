import { Component, Input } from '@angular/core';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { NavController } from 'ionic-angular';
import { Beacon } from '../../app/beacon.model';

@Component({
  selector: 'beacon',
  templateUrl: 'beacon.html'
})
export class BeaconComponent {

  @Input() device: Beacon;

  constructor(
    private storage: BeaconsStorage,
    public navCtrl: NavController
  ) {}

  buscar() {
    this.navCtrl.push('SearchPage', {beacon: this.device});
  }

  editar() {
    this.navCtrl.push('DeviceOptionsPage', {beacon: this.device});
  }

}
