import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVoitureComponent } from './voiture/list-voiture/list-voiture.component';
import { DetailVoitureComponent } from './voiture/detail-voiture/detail-voiture.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { ListReservationComponent } from './admin/list-reservation/list-reservation.component';

const routes: Routes = [ 
  {path: 'reservations',component:ListReservationComponent},

  // { path : '' ,redirectTo : 'voitures', pathMatch:'full'},
  { path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
