import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { VoitureModule } from '../voiture/voiture.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './home/home.module';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { MaReservationComponent } from './ma-reservation/ma-reservation.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PublicComponent,
    MaReservationComponent,
    
    
  ],
  imports: [
    CommonModule,
  
    HomeModule,
    PublicRoutingModule,
    VoitureModule,
  ],
  exports :[
    HeaderComponent,
    FooterComponent,
    
  ]

})
export class PublicModule { }
