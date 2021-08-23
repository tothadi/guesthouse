import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: 'kezdolap',
    component: HomeComponent
  },
  {
    path: 'szobak',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule)
  },
  {
    path: 'kapcsolat',
    component: ContactComponent
  },
  {
    path: 'foglalas',
    component: ReservationComponent
  },
  {
    path: '',
    redirectTo: '/kezdolap',
    pathMatch: 'full'
  },
  { 
    path: '**',
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
