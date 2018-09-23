import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComponentsModule } from '../components/components.module';
import { BeaconsStorage } from '../providers/beacons-storage/beacons-storage';
import { BeaconMonitorProvider } from '../providers/beacon-monitor/beacon-monitor';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthProvider } from '../providers/auth/auth';
import { BeaconStalkerProvider } from '../providers/beacon-stalker/beacon-stalker';
import {ContentPopoverComponent} from "../components/content-popover/content-popover";
import {LoginPage} from "../pages/login/login";

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

const firebaseConfig = {
  apiKey: "AIzaSyAq6P4eZJLp6cj1_zseF4N8Ouxj5kFZSWQ",
  authDomain: "blueon-dbf11.firebaseapp.com",
  databaseURL: "https://blueon-dbf11.firebaseio.com",
  projectId: "blueon-dbf11",
  storageBucket: "blueon-dbf11.appspot.com",
  messagingSenderId: "271111022906"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IBeacon,
    LocalNotifications,
    BackgroundMode,
    BeaconsStorage,
    BeaconMonitorProvider,
    AuthProvider,
    BeaconStalkerProvider,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
