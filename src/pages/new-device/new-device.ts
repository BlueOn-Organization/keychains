import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { Beacon } from '../../app/beacon.model';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-new-device',
  templateUrl: 'new-device.html',
})
export class NewDevicePage {
  public currentState: any;
  public lightEnabled: boolean = false;

  //Capabilities
  public isAvailable: boolean = true;
  public isCameraVisible: boolean = false;
  public hasPermission: boolean = false;
  public isDenied: boolean = false;
  public isRestricted: boolean = false;
  public unavailable: boolean = false;
  public canEnableLight: boolean = false;
  public canOpenSettings: boolean = false;

  constructor(
    private navCtrl: NavController,
    private qrScanner: QRScanner,
    private alertCtrl: AlertController,
    private storage: BeaconsStorage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
    this.scan();
  }

  ionViewWillLeave() {
    if (this.lightEnabled) {
      this.qrScanner.disableLight();
      this.lightEnabled = false;
    }

    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  private scan() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        this.updateCapabilities(status);

        if (status.authorized) {
          console.log('Activating scanner...');
          this.qrScanner.show().then(() => {
            this.isCameraVisible = true

            console.log('Scanning...');
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              // this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe();
              console.log('Scan returned: "' + text + '"');
              this.handleSuccessfulScan(text);
            });

          });
        }
      })
      .catch(err => {
        this.unavailable = true;
        console.log('Error', err);
      });
  }

  private handleSuccessfulScan(contents: string): void {
    try {
      const obj = <Beacon>JSON.parse(contents);
      if (!this.validUuid(obj.uuid)) throw new SyntaxError;
      this.saveDevice(obj);
    } catch (error) {
      const alert = this.alertCtrl.create({ subTitle: 'El código QR no contiene información reconocible.' });
      alert.present();
      alert.onDidDismiss(() => this.scan());
    }
  }

  private validUuid(content: string) {
    const regx = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return regx.test(content)
  }

  private saveDevice(beacon: Beacon) {
    let prompt = this.alertCtrl.create({
      title: 'Agregar',
      subTitle: 'dispositivo detectado:',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            this.alertCtrl.create({ title: 'Dispositivo descartado' }).present();
            this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            if (data.name == '') {
              return false;
            } else {
              beacon.nombre = data.name;
              this.storage.save(beacon);
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  private updateCapabilities(status: QRScannerStatus): void {
    this.hasPermission = status.authorized;
    this.isDenied = status.denied;
    this.isRestricted = status.restricted;
    this.canEnableLight = status.canEnableLight;
    this.canOpenSettings = status.canOpenSettings;
  }

  public toggleLight(): void {
    console.log('Toggling light...');
    const promise = this.lightEnabled ? this.qrScanner.disableLight() : this.qrScanner.enableLight();

    promise
      .then(() => this.lightEnabled = !this.lightEnabled)
      .catch(err => console.log("Error: ", err));
  }

}
