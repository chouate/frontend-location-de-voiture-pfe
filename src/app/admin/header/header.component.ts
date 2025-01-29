import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationCountService } from 'src/app/voiture/reservation-count.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  nouvellesReservations: number = 0;

  constructor(
    private http: HttpClient,
    private reservationCountService :ReservationCountService,
    private router:Router,
  ){}

  ngOnInit(): void {
    // this.fetchNouvellesReservations();
    this.fetchNouvellesReservations();
    this.subscribeToNouvellesReservations();
  }

  fetchNouvellesReservations(): void {
    this.reservationCountService.fetchNouvellesReservations();
    this.nouvellesReservations = this.reservationCountService.nouvellesReservations;
  }
  
  subscribeToNouvellesReservations(): void {
    this.reservationCountService.nouvellesReservationsSubject.subscribe(
      (nouvellesReservations: number) => {
        this.nouvellesReservations = nouvellesReservations;
      }
    );
  }
  // fetchNouvellesReservations(): void {
  //   this.http.get<any>('http://localhost:3000/reservationCount')
  //     .subscribe(
  //       (response) => {
  //         this.nouvellesReservations = parseInt(response[0].nouvellesReservations);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la récupération du nombre de nouvelles réservations', error);
  //       }
  //     );
  // }
  goTofacture(){
    this.router.navigate(['factures']);
  }
}
