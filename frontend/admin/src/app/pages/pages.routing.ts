import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'aktualitasok',
    pathMatch: 'full'
  },
  {
    path: 'aktualitasok',
    component: PagesComponent,
  },
  {
    path: 'foglalasok',
    component: PagesComponent,
  },
  {
    path: 'kapcsolat',
    component: PagesComponent,
  },
  {
    path: 'kezdolap',
    component: PagesComponent,
  },
  {
    path: 'szobak',
    component: PagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
