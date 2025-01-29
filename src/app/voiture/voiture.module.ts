import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVoitureComponent } from './list-voiture/list-voiture.component';
import { DetailVoitureComponent } from './detail-voiture/detail-voiture.component';
import { VoitureCarburantColorPipe } from './voiture-carburant-color.pipe';
import { BorderCardDirective } from './border-card.directive';
import { RouterModule, Routes } from '@angular/router';
import { VoitureService } from './voiture.service';
import { FormsModule } from '@angular/forms';
import { VoitureFormComponent } from './voiture-form/voiture-form.component';
import { EditVoitureComponent } from './edit-voiture/edit-voiture.component';
import { AddVoitureComponent } from './add-voiture/add-voiture.component';
import { SearchVoitureComponent } from './search-voiture/search-voiture.component';
import { LoaderComponent } from './loader/loader.component';
import { ClientNavComponent } from './client-nav/client-nav.component';
import { AddbtnComponent } from './addbtn/addbtn.component';
import { HomeComponent } from '../public/home/home.component';
import { DetailVoitureUserComponent } from './detail-voiture-user/detail-voiture-user.component';
import { ListVoitureUserComponent } from './list-voiture-user/list-voiture-user.component';
import { DetailReservationComponent } from './detail-reservation/detail-reservation.component';
import { ReservationCountService } from './reservation-count.service';
import { NgxPaginationModule } from 'ngx-pagination';



const voitureRoutes: Routes = [ 

  { path : 'edit/voiture/:id' , component : EditVoitureComponent},
  { path : 'voitures',component : ListVoitureComponent},
  { path : 'clientHome/:userId/voiture/:voitureId' , component : DetailVoitureUserComponent},
  { path : 'voiture/add' , component : AddVoitureComponent},
 
];
@NgModule({
  declarations: [
    ListVoitureComponent,
    DetailVoitureComponent,
    VoitureCarburantColorPipe,
    BorderCardDirective,
    VoitureFormComponent,
    EditVoitureComponent,
    AddVoitureComponent,
    SearchVoitureComponent,
    LoaderComponent,
    ClientNavComponent,
    AddbtnComponent,
    DetailVoitureUserComponent,
    ListVoitureUserComponent,
    DetailReservationComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    
    RouterModule.forChild(voitureRoutes)
  ],
  exports:[
    ListVoitureComponent,
    ListVoitureUserComponent,
    DetailReservationComponent,
    
  ],
  providers : [
    VoitureService,
    // ReservationCountService,
  ]
})
export class VoitureModule { }
