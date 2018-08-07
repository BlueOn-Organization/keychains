import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import {auth} from "firebase/app";

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
    public storage: Storage,
    public alertCtrl : AlertController
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
        //this.navCtrl.setRoot('IntroPage');
        this.navCtrl.setRoot('IntroPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
    } catch (err) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  facebook(){
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider).then(x=>{
        if (x){
          this.navCtrl.setRoot('IntroPage', {}, {
            animate: true,
            direction: 'forward'
          });
        }
      }
    )
  }


  twiter(){
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider()).then(x=>{
        if (x){
          this.navCtrl.setRoot('IntroPage', {}, {
            animate: true,
            direction: 'forward'
          });
        }
      }
    )
  }

  signin(){
    // this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
    //   .then((user) => {
    //     // El usuario se ha creado correctamente
    //     this.storage.set('loginOn', true);
    //     //this.navCtrl.setRoot('IntroPage');
        this.navCtrl.setRoot('IntroPage', {}, {
          animate: true,
          direction: 'forward'
        });
      // })
      // .catch(err=>{
      //   let alert = this.alertCtrl.create({
      //     title: 'Error',
      //     subTitle: err.message,
      //     buttons: ['Aceptar']
      //   });
      //   alert.present();
      // })

  }
}
