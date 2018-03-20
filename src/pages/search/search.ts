import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDistanceProvider } from '../../providers/get-distance/get-distance';
import { Beacon } from '../../app/beacon.model';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  distance: number = -1;
  background: string;
  label: string = 'No se';
  label2: string = '';
  fuera: boolean;
  negativecontroller: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public finder: GetDistanceProvider,
    private ngzone: NgZone
  ) {
    this.background = '#2575bb';
  }

  ionViewDidLoad() {
    const beacon = <Beacon>this.navParams.get('beacon');
    // this.find(beacon);
  }

  find(beacon: Beacon) {
    this.finder.start(beacon).subscribe(distance => {
      console.log(distance);

      this.ngzone.run(() => {
        if (distance < 0) {
          if (this.negativecontroller < -10) {
            this.background = '#eff0f1';
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

          if (this.distance < 1) {
            this.background = '#2575bb';
            this.label = 'Muy cerca';
            this.label2 = '';
          }
          else if (this.distance <= 2) {
            this.background = '#0a1863';
            this.label = 'Bastante cerca';
            this.label2 = `distancia aproximada ${distance}m`;
          }
          else if (this.distance <= 3) {
            this.background = '#0a1863';
            this.label = 'Estas cerca';
            this.label2 = `distancia aproximada ${distance}m`;
          }
          else if (this.distance <= 5) {
            this.background = '#edd015';
            this.label = 'Estas lejos';
            this.label2 = `distancia aproximada ${distance}m`;
          }
          else {
            this.background = '#bc1e0d';
            this.label = 'Bastante lejos';
            this.label2 = '';
          }
          this.distance = distance;
        }
      });
    });
  }

  ionViewWillLeave() {
    this.finder.stop();
  }

}
