import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { ReservationService } from 'src/app/voiture/reservation.service';
import { Reservation } from 'src/app/voiture/reservation';
import { ClientService } from 'src/app/voiture/client.service';
import { Client } from 'src/app/voiture/client';
import { Voiture } from 'src/app/voiture/voiture';
import { VoitureService } from 'src/app/voiture/voiture.service';

@Component({
  selector: 'app-ma-reservation',
  templateUrl: './ma-reservation.component.html',
  styles: [
  ]
})
export class MaReservationComponent {
  reservations: Reservation[] = [];
  client:Client={
    id: 0,
    fullname: '',
    email: '',
    mobile: 0,
    password: 0,
    numeroPermis:'',
    dateDelivrance:'',
  };
  voiture:Voiture|undefined ;
  voitureNames: string[] = [];
  clientId:string|null;

  reversedReservations: Reservation[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];

  constructor(
    private http: HttpClient,
    private clientService:ClientService,
    private reservationService :ReservationService,
    private voitureService:VoitureService,
  ) { }

  ngOnInit(): void {
    
    this.clientId=localStorage.getItem('user');
    this.getClient();
    this.getReservationClient();
    //this.getReservation();
    
  }
   
    
  getClient(): void {
    if(this.clientId)
      this.clientService.getClientById(+this.clientId).subscribe(client => {
        this.client = client;
        // Faites quelque chose avec l'objet client ici
      });
  }
  getReservation():void{
    this.reservationService.getReservations().subscribe(
      reservations=>{
        this.reservations=reservations;
      }
    )
  }
  // getReservationClient():void{
  //   if(this.clientId)
  //   this.reservationService.getReservationClient(this.clientId).subscribe(
  //     reservations =>{
  //       this.reservations=reservations;
  //     }
  //   )
  // }
  // getReservationClient(): void {
  //   if (this.clientId) {
  //     this.reservationService.getReservationClient(this.clientId).subscribe(
  //       reservations => {
  //         this.reservations = reservations;
  
  //         const requests = reservations.map(reservation =>
  //           this.voitureService.getVoitureById(reservation.carId)
  //         );
  
  //         forkJoin(requests).subscribe(voitures => {
  //           reservations.forEach((reservation, index) => {
  //             reservation.voitureName = voitures[index].name;
  //           });
  //         });
  //       }
  //     );
  //   }
  // }

  getReservationClient(): void {
    if (this.clientId) {
      this.reservationService.getReservationClient(this.clientId).subscribe(
        reservations => {
          this.reservations = reservations.reverse();
          this.updateReversedReservations();
          this.updatePagination();
  
          const voitureIds = reservations.map(reservation => reservation.carId);
          const requests = voitureIds.map(voitureId =>
            this.voitureService.getVoitureById(voitureId)
          );
  
          // forkJoin(requests).subscribe(voitures => {
          //   this.voitureNames = voitures.map(voiture => voiture.name);
          // }); pour eviter le cas ou une voiture est undifined 
          forkJoin(requests).subscribe(voitures => {
            this.voitureNames = voitures
              .filter(voiture => voiture !== undefined)
              .map(voiture => voiture!.name);
          });
        }
      );
    }
  }
  updateReversedReservations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.reversedReservations = this.reservations.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    const totalPages = Math.ceil(this.reservations.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateReversedReservations();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.updateReversedReservations();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.updateReversedReservations();
    }
  }

  // getVoiture(voitureId: number): void {
  //   this.voitureService.getVoitureById(voitureId).subscribe(voiture => {
  //     this.voiture = voiture;
  //   });
  // }
  getVoiture(voitureId: number): void {
    this.voitureService.getVoitureById(voitureId).subscribe(voiture => {
      this.voiture = voiture;
      this.reservations.forEach(reservation => {
        reservation.voiture = voiture?.name ||'';
      });
    });
  }
  getVoitureName(voitureId: number): Observable<string> {
    return this.voitureService.getVoitureById(voitureId).pipe(
      map(voiture => {
        return voiture?.name || '';
        console.log('voiture?.name');
      })
    );
  }
  // getReservationsclient(): void {
  //   // Utilisez le service de réservation pour obtenir les réservations des clients
  //     this.getReservations().subscribe(reservations => {
  //     this.reservations = reservations;
  //   });
  // }

  // isReservationConfirmed(reservation: Reservation): boolean {
  //   // Vérifiez si la réservation est confirmée
  //   return reservation.status === 'Confirmée';
  // }

  // isReservationCancelled(reservation: Reservation): boolean {
  //   // Vérifiez si la réservation est annulée
  //   return reservation.status === 'Annulée';
  // }

  // getReservations():Observable<Reservation[]>{
  //   return this.http.get<Reservation[]>('http://localhost:3000/reservation')
  // } 
}
