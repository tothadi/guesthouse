import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RoomsRoutingModule } from './rooms.routing';

import { RoomsComponent } from './rooms.component';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
  declarations: [
    RoomsComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RoomsRoutingModule
  ],
  providers: [
  
    ],
  exports: [
    LoaderComponent
  ]
})
export class RoomsModule {

}
