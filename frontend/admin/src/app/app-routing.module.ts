import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth';
import { ControlComponent } from './control/control.component';
import { NotFoundComponent } from './not-found/not-found.component';

const authRoute = {
  path: 'auth',
  outlet: 'dialog',
  loadChildren: () => import('@auth').then(m => m.AuthModule)
};

const controlRoute = {
  path: 'home',
  component: ControlComponent,
  canActivate: [AuthGuard]
};

const routes: Routes = [
  authRoute,
  controlRoute,
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
