import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PublicComponent } from './public.component';
import { DetailReservationComponent } from '../voiture/detail-reservation/detail-reservation.component';
import { DetailVoitureUserComponent } from '../voiture/detail-voiture-user/detail-voiture-user.component';
import { ListVoitureUserComponent } from '../voiture/list-voiture-user/list-voiture-user.component';
import { MaReservationComponent } from './ma-reservation/ma-reservation.component';

const routes: Routes = [
  {
    path : '', component:PublicComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'voitures',component:ListVoitureUserComponent},
      {path:'voitures/:voitureId',component:DetailVoitureUserComponent},
      {path:'voitures/:voitureId/reservation',component:DetailReservationComponent},
      {path:'maReservation',component:MaReservationComponent},

      {path:'clientHome/:userId',component:HomeComponent},
      {path:'clientHome/:userId/voiture/:voitureId/reservation',component:DetailReservationComponent},
      { path : 'login' ,component: LoginComponent},
      { path: 'signup', component : SignupComponent},
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
