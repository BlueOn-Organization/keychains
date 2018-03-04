import { NgModule } from '@angular/core';
import { BeaconComponent } from './beacon/beacon';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [BeaconComponent],
	imports: [IonicModule],
	exports: [BeaconComponent]
})
export class ComponentsModule {}
