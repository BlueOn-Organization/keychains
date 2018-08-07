import { NgModule } from '@angular/core';
import { BeaconComponent } from './beacon/beacon';
import { IonicModule } from 'ionic-angular';
import { NotificationToggleComponent } from './notification-toggle/notification-toggle';
import { ContentPopoverComponent } from './content-popover/content-popover';

@NgModule({
	declarations: [BeaconComponent,
    NotificationToggleComponent,
    ContentPopoverComponent],
	imports: [IonicModule],
	exports: [BeaconComponent,
    NotificationToggleComponent,
    ContentPopoverComponent]
})
export class ComponentsModule {}
