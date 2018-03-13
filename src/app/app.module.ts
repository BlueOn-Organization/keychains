import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Dialogs } from '@ionic-native/dialogs';
import { BLE } from '@ionic-native/ble';
import { IBeacon } from '@ionic-native/ibeacon';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComponentsModule } from '../components/components.module';
import { BeaconsStorage } from '../providers/beacons-storage/beacons-storage';
import { GetDistanceProvider } from '../providers/get-distance/get-distance';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthProvider } from '../providers/auth/auth';
import { PublicitaryWatcher } from '../providers/publicitary-watcher/publicitary-watcher';

const firebaseConfig = {
  apiKey: "AIzaSyDkG0xW9jkNCm0HnKCt6ddx5F-HyDUdulM",
  authDomain: "blue-on.firebaseapp.com",
  databaseURL: "https://blue-on.firebaseio.com",
  projectId: "blue-on",
  storageBucket: "blue-on.appspot.com",
  messagingSenderId: "88739997891"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Dialogs,
    BLE,
    IBeacon,
    BeaconsStorage,
    GetDistanceProvider,
    AuthProvider,
    PublicitaryWatcher
  ]
})
export class AppModule {}
