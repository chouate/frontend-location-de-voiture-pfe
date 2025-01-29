import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { ReservationCountService } from '../voiture/reservation-count.service';
import { LocationAdminComponent } from './location-admin/location-admin.component';
import { FormsModule } from '@angular/forms';
import { ContratLocationComponent } from './contrat-location/contrat-location.component';
import { ReservationNotFoundDialogComponent } from './reservation-not-found-dialog/reservation-not-found-dialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { FactureComponent } from './facture/facture.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AdminComponent,
    ListReservationComponent,
    LocationAdminComponent,
    ContratLocationComponent,
    ReservationNotFoundDialogComponent,
    DialogComponent,
    LoginComponent,
    FactureComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    
  ],
  exports:[
    HeaderComponent,
  ],
  providers:[
    ReservationCountService,
  ]
})
export class AdminModule { }
