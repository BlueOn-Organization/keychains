import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeaconMonitorProvider } from '../../providers/beacon-monitor/beacon-monitor';
import { Beacon } from '../../app/beacon.model';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  distance: number = -1;
  beacon_name: string;
  gif: string = '';
  label: string = 'Buscando...';
  label2: string = '';
  fuera: boolean;
  negativecontroller: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public monitor: BeaconMonitorProvider,
    private ngzone: NgZone
  ) {
    this.gif = '../assets/imgs/gif1.gif';
  }

  ionViewDidLoad() {
    const beacon = <Beacon>this.navParams.get('beacon');
    this.beacon_name = beacon.nombre;
    this.find(beacon);
  }

  find(beacon: Beacon) {
    this.monitor.trace(beacon).subscribe(distance => {
      console.log(distance);

      this.ngzone.run(() => {
        if (distance < 0) {
          if (this.negativecontroller < -10) {
            this.gif = '../assets/imgs/gif1.gif';
            this.label = 'Fuera de rango';
            this.label2 = '';
            this.fuera = true;
          }
          this.negativecontroller--;
        } else {
          if (this.fuera) {
            // this.dialogs.beep(1);
            this.fuera = false;
          }
          this.negativecontroller = 0;

          if (this.distance < 2) {
            this.gif = '../assets/imgs/gif1.gif';
            this.label = 'Muy cerca';
            this.label2 = '';
          }
          else if (this.distance <= 5) {
            this.gif = '../assets/imgs/gif2.gif';
            this.label = 'Estas lejos';
            this.label2 = `distancia aproximada ${distance}m`;
          }
          else {
            this.gif = '../assets/imgs/gif3.gif';
            this.label = 'Bastante lejos';
            this.label2 = '';
          }
          this.distance = distance;
        }
      });
    });
  }

  ionViewWillLeave() {
    this.monitor.stop();
  }

}
