import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemoMapPage } from './demo-map';

@NgModule({
  declarations: [
    DemoMapPage,
  ],
  imports: [
    IonicPageModule.forChild(DemoMapPage),
  ],
})
export class DemoMapPageModule {}
