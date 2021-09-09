import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule} from '@angular/material/progress-bar'
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesRoutingModule } from './pages.routing';
import { PageService } from './pages.service';

import { LoaderComponent } from '../loader/loader.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { PagesComponent } from './pages.component';
import { PicturesComponent } from './pictures/pictures.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    LoaderComponent,
    EditDialogComponent,
    RemoveDialogComponent,
    PagesComponent,
    PicturesComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [PageService],
  exports: [LoaderComponent],
})
export class PagesModule {}
