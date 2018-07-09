import { Component } from '@angular/core';
import { BackgroundMode, BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'notification-toggle',
  templateUrl: 'notification-toggle.html'
})
export class NotificationToggleComponent {
  enabled: boolean;

  constructor(
    private backgroundMode: BackgroundMode,
    private storage: Storage
  ) {
    this.storage.get('beacon-watching').then(enabled => enabled && this.enabledBackground());

    backgroundMode.setDefaults({
      title: 'Monitor de dispositivos activo',
      text: 'Se te notificara cuando alguno de tus dispositivos este fuera de rango.'
    });
  }

  on() {
    this.storage.set('beacon-watching', true);
    this.enabledBackground()
  }

  off() {
    this.storage.set('beacon-watching', false);
    this.disableBackground();
  }

  enabledBackground() {
    this.enabled = true;
    this.backgroundMode.enable();
    this.backgroundMode.overrideBackButton();
  }

  disableBackground() {
    this.enabled = false;
    this.backgroundMode.disable();
  }

  startMonitoring() {
    
  }

}
