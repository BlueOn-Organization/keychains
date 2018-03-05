import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {HomePage} from '../home/home';
import {IntroPage} from '../intro/intro';
import { Storage } from '@ionic/storage';

export interface User {
  email: string;
  password: string;
}
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;


  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public navParams: NavParams,
    public storage: Storage
    ) {

  }

  ionViewDidLoad() {

  }
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.storage.set('loginOn', true);
        this.navCtrl.setRoot('IntroPage');
      }
    } catch (e) {
      console.error(e);
    }
  }

}
