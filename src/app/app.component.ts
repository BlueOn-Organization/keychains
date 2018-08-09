import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from "../pages/home/home";
import { BackgroundMode } from '@ionic-native/background-mode';
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    private app: App,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage,
    backgroundMode: BackgroundMode
  ) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#990066');

      splashScreen.hide();

      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        let activeView: any = nav.getActive();

        if (activeView != null) {
          if (nav.canGoBack()) {
            nav.pop();
          } else if (backgroundMode.isEnabled()) {
            backgroundMode.moveToBackground();
          }
        }
      });
    });

    storage.get('introShown').then(result => {
      console.log('introShown' + result);
      if (result) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });

  }
}

