import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { authProviders } from './auth.provider';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [AuthGuard, AuthService, AuthInterceptor, authProviders],
  exports: [AuthComponent],
})
export class AuthModule {}
