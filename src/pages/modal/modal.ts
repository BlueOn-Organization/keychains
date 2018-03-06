import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  imagen:string;

  constructor(public navParams: NavParams) {
    this.imagen = this.navParams.get('imagen');
  }

}
