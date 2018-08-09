import { Component } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {NavController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import {LoginPage} from "../../pages/login/login";

/**
 * Generated class for the ContentPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-popover',
  templateUrl: 'content-popover.html'
})
export class ContentPopoverComponent {

  text: string;

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController,public storage: Storage,) {
    this.text = 'Cerrar Sesión';
  }

  logout(){
    this.afAuth.auth.signOut().then(x=>{
      this.storage.set('introShown', false);
      this.navCtrl.push(LoginPage);
    });

    console.log('cerrando');
  }

}
