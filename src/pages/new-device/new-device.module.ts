import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDevicePage } from './new-device';

@NgModule({
  declarations: [
    NewDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDevicePage),
  ],
})
export class NewDevicePageModule {}
