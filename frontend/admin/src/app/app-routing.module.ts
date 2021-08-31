import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'bejelentkezes', component: AuthComponent },
  { path: 'beallitasok', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'felhasznalo', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: 'oldalak',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
