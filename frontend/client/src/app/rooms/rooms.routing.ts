import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DoubleBedComponent } from './double-bed/double-bed.component';
import { GardenComponent } from './garden/garden.component';
import { LivingRoomComponent } from './living-room/living-room.component';
import { SingleBedComponent } from './single-bed/single-bed.component';
import { WhiteRoomComponent } from './white-room/white-room.component';

const routes: Routes = [
  {
    path: 'nappali',
    component: LivingRoomComponent
  },
  {
    path: 'feher-szoba',
    component: WhiteRoomComponent
  },
  {
    path: 'francia-agyas',
    component: DoubleBedComponent
  },
  {
    path: 'ket-agyas',
    component: SingleBedComponent
  },
  {
    path: 'kert',
    component: GardenComponent
  },
  {
    path: '',
    redirectTo: 'nappali',
    pathMatch: 'full'
  },
  { 
    path: '**',
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
