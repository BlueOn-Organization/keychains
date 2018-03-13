import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleListPage } from './ble-list';

@NgModule({
  declarations: [
    BleListPage,
  ],
  imports: [
    IonicPageModule.forChild(BleListPage),
  ],
})
export class BleListPageModule {}
