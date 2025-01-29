import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VoitureModule } from './voiture/voiture.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { ReservationCountService } from './voiture/reservation-count.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    
    PublicModule, 
    AdminModule,
    VoitureModule,
    AppRoutingModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,  { dataEncapsulation: false }),
    MatDialogModule,
    NgxPaginationModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    
  ],
  // providers: [
  //   ReservationCountService,
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
