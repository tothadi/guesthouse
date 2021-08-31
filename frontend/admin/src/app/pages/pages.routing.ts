import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { ActualitiesComponent } from "./actualities/actualities.component";
import { ContactComponent } from "./contact/contact.component";
import { GreetComponent } from "./greet/greet.component";
import { ReservationsComponent } from "./reservations/reservations.component";
import { RoomsComponent } from "./rooms/rooms.component";

const routes: Routes = [
  {
    path: 'aktualitasok',
    component: ActualitiesComponent
  },
  {
    path: 'foglalasok',
    component: ReservationsComponent
  },
  {
    path: 'kapcsolat',
    component: ContactComponent
  },
  {
    path: 'kezdolap',
    component: GreetComponent
  },
  {
    path: 'szobak',
    component: RoomsComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {

}
