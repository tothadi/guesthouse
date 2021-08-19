import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RoomsRoutingModule } from './rooms.routing';

import { RoomsComponent } from './rooms.component';

@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RoomsRoutingModule
  ],
  providers: [
  
    ],
  exports: [
  ]
})
export class RoomsModule {

}
