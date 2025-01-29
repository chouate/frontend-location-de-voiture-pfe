import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap } from 'rxjs';


const API_LINK='http://localhost:3000/reservationCount';


@Injectable({
  providedIn: 'root'
})


export class ReservationCountService {
  
   nouvellesReservations: number =0;
   nouvellesReservationsSubject: Subject<number> = new Subject<number>();


  constructor(private http :HttpClient) { }



  // fetchNouvellesReservations(): void {
  //   this.http.get<any[]>('http://localhost:3000/reservationCount').subscribe(
  //     (reservationCount: any[]) => {
  //       const countEntry = reservationCount[0]; // Récupérer le premier élément du tableau
  //       const nouvellesReservations = +countEntry.nouvellesReservations; // Convertir en nombre
  //       this.nouvellesReservations = nouvellesReservations;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération du nombre de nouvelles réservations', error);
  //     }
  //   );
  // }
  fetchNouvellesReservations(): void {
    this.http.get<any[]>('http://localhost:3000/reservationCount').subscribe(
      (reservationCount: any[]) => {
        const countEntry = reservationCount[0];
        const nouvellesReservations = +countEntry.nouvellesReservations;
        this.nouvellesReservations = nouvellesReservations;
        this.nouvellesReservationsSubject.next(nouvellesReservations); // Émettre la nouvelle valeur
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre de nouvelles réservations', error);
      }
    );
  }

  // incrementNouvellesReservations(): void {
  //   const updatedCountEntry = this.nouvellesReservations + 1;

  //   this.http
  //     .patch('http://localhost:3000/reservationCount/0', { nouvellesReservations: updatedCountEntry })
  //     .subscribe(
  //       (response) => {
  //         console.log('Nombre de nouvelles réservations incrémenté avec succès !', response);
  //         this.nouvellesReservations = updatedCountEntry;
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'incrémentation du nombre de nouvelles réservations', error);
  //       }
  //     );
  // }
  incrementNouvellesReservations(): void {
    const updatedCountEntry = this.nouvellesReservations + 1;

    this.http
      .patch('http://localhost:3000/reservationCount/0', { nouvellesReservations: updatedCountEntry })
      .subscribe(
        (response) => {
          console.log('Nombre de nouvelles réservations incrémenté avec succès !', response);
          this.nouvellesReservations = updatedCountEntry;
          this.nouvellesReservationsSubject.next(updatedCountEntry); // Émettre la nouvelle valeur
        },
        (error) => {
          console.error('Erreur lors de l\'incrémentation du nombre de nouvelles réservations', error);
        }
      );
  }


}
