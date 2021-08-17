import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthGuard } from './auth.guard';
import { authProviders } from './auth.provider';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent],
  imports: [
      AuthRoutingModule,
      HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    authProviders,
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
