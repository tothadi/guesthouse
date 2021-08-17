import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteRoomComponent } from './white-room/white-room.component';
import { DoubleBedComponent } from './double-bed/double-bed.component';
import { SingleBedComponent } from './single-bed/single-bed.component';
import { LivingRoomComponent } from './living-room/living-room.component';
import { GardenComponent } from './garden/garden.component';
import { RoomsRoutingModule } from './rooms.routing';

@NgModule({
  declarations: [
    WhiteRoomComponent,
    DoubleBedComponent,
    SingleBedComponent,
    LivingRoomComponent,
    GardenComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule
  ],
  exports: [
  ]
})
export class RoomsModule { }
