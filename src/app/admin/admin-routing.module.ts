import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListVoitureComponent } from '../voiture/list-voiture/list-voiture.component';
import { DetailVoitureComponent } from '../voiture/detail-voiture/detail-voiture.component';
import { AddVoitureComponent } from '../voiture/add-voiture/add-voiture.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { LocationAdminComponent } from './location-admin/location-admin.component';
import { ContratLocationComponent } from './contrat-location/contrat-location.component';
import { AuthGuard } from '../auth.guard';
import { LoginComponent } from './login/login.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  // canActivate:[AuthGuard],
  {
    path : 'admin', component:AdminComponent,canActivate:[AuthGuard],
    children:[
      {path : 'voitures',component:ListVoitureComponent},
      {path : 'voiture/:id' , component : DetailVoitureComponent},
      {path : 'reservations',component:ListReservationComponent},     
      {path : 'reservation/:reservationId/voiture/:id' , component : DetailVoitureComponent},
      {path : 'locations',component:LocationAdminComponent},
     
  
    ]
  },
  {path : 'reservation/:reservationId' , component : ContratLocationComponent},
  {path:'reservations/contrat',component:ContratLocationComponent},
  {path:'locations',component:LocationAdminComponent},
  {path:'admin/login',component:LoginComponent},
  {path:'factures',component:FactureComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
