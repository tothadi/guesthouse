import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesRoutingModule } from './pages.routing';

import { LoaderComponent } from '../loader/loader.component';
import { PageService } from './pages.service';
import { ActualitiesComponent } from './actualities/actualities.component';
import { ContactComponent } from './contact/contact.component';
import { GreetComponent } from './greet/greet.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ActualitiesComponent,
    ContactComponent,
    GreetComponent,
    ReservationsComponent,
    RoomsComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [PageService],
  exports: [LoaderComponent],
})
export class PagesModule {}
