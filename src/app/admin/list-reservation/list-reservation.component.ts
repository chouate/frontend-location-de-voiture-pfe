import { Component,OnInit,AfterViewInit } from '@angular/core';
import { ReservationService } from '../../voiture/reservation.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ClientService } from 'src/app/voiture/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservationNotFoundDialogComponent } from '../reservation-not-found-dialog/reservation-not-found-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
// import { ReservationNotFoundDialogComponent } from './reservation-not-found-dialog/reservation-not-found-dialog.component';


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styles: [
  ]
})
export class ListReservationComponent implements OnInit {
  reservations: any[];
  reservationCherchee:any;
  client :any;
  pagedReservations: any[];
  currentPage: number = 1;
  pageSize: number = 5;
  pages: number[] = [];
  searchReservationId: number ;
  disponibleClicked: boolean = false; // cette variable pour suivre l'état du bouton "disponible?"


  constructor(
    private reservationService: ReservationService,
    private router :Router,
    private clientService:ClientService,
    private dialog: MatDialog,

  ) { }

  // ngAfterViewInit() {
  //   M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  // }
  
  ngOnInit() {
    this.loadReservations();
    //this.client=this.reservationService.getClientById('1');
    console.log(this.client);
  }

  loadReservations() {
    // Appeler le service pour récupérer les réservations
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data.sort((a, b) => b.id - a.id);;
        this.setPage(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setPage(page: number) {
    this.currentPage = page;
    this.pagedReservations = this.reservations.slice(
      (page - 1) * this.pageSize,
      page * this.pageSize
    );
    this.calculatePages();
  }

  calculatePages() {
    const pageCount = Math.ceil(this.reservations.length / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= pageCount; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number) {
    this.setPage(page);
  }
  confirmerReservation(reservation: any) {
    // Appeler le service pour confirmer la réservation
    this.reservationService.confirmerReservation(reservation.id).subscribe(
      (data) => {
        // Mettre à jour le statut de la réservation dans la liste
        reservation.status = 'Confirmée';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  annulerReservation(reservation: any) {
    // Appeler le service pour annuler la réservation
    this.reservationService.annulerReservation(reservation.id).subscribe(
      (data) => {
        // Mettre à jour le statut de la réservation dans la liste
        reservation.status = 'Annulée';
      },
      (error) => {
        console.log(error);
      }
    );
  }
  supprimerReservation(reservation:any){
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if(res){
      this.reservationService.supprimerReservation(reservation.id).subscribe(
        ()=>this.loadReservations(),
      )
    }
    
  }
  getClientName(clientId :number ){
    return this.clientService.getClientById(clientId).pipe(
      map((client: any) => `${client.fullname} `)
    
    );
  }
  goToVoiture(reservationId :number,voitureId:number){
    this.router.navigate(['/admin/reservation/',reservationId,'voiture',voitureId])
  }

  goTocontrat(reservation :any){
    this.router.navigate(['reservation/',reservation.id]);
  }
 
  searchReservation() {
    if (this.searchReservationId > 0) {
      // Appeler le service pour récupérer la réservation par son numéro
      this.reservationService.getReservationById(this.searchReservationId).subscribe(
        (reservation) => {
          
          this.reservationCherchee = reservation;
         
        },
        (error) => {
          console.log(error);
          this.reservationCherchee = null;
          this.openDialog('Aucune réservation trouvée avec ce numéro.');
          this.openDialog('cette voiture est Disponible pour ces dates .');
          this.openDialog('cette voiture n\'est Disponible pour ces dates .');
          //this.openReservationNotFoundDialog();
         // alert('Aucune réservation trouvée avec ce numéro.');
        }
      );
    } else {
      // Numéro de réservation non valide
      this.reservationCherchee = null;
      this.openDialog('Veuillez saisir un numéro de réservation valide.');
    }
  }
  openReservationNotFoundDialog() {
    const dialogRef = this.dialog.open(ReservationNotFoundDialogComponent, {
      height:'200px',
      width: '300px',
      data: { message: 'Aucune réservation trouvée avec ce numéro.' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Actions à effectuer après la fermeture de la fenêtre modale
    });
  }
  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: message }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Actions à effectuer après la fermeture de la boîte de dialogue
    });
  }
  // Méthode pour gérer le clic sur le bouton "disponible?"
  onDisponibleClick(reservation: any) {
    const reservationEndDate = new Date(reservation.endDate); // Convertir la date de fin de la réservation en objet Date
    const reservationStartDate = new Date(reservation.startDate);// Convertir la date de début de la réservation en objet Date
    // Appeler le service pour récupérer toutes les réservations confirmées pour la voiture en question
    this.reservationService.getConfirméesByVoitureId(reservation.carId).subscribe(
      (confirmées) => {
        // Vérifier si la date de fin de la réservation est inférieure à toutes les dates de début des réservations confirmées
        const isDisponible = confirmées.every((confirmée) => {
          const startDate = new Date(confirmée.startDate);
          const endDate = new Date(confirmée.endDate);
          return reservationEndDate < startDate || reservationStartDate> endDate;
        });

        if (isDisponible) {
          this.openDialog('Cette voiture est disponible pour ces dates.');
        } else {
          this.openDialog('Cette voiture n\'est pas disponible pour ces dates.');
        }
      },
      (error) => {
        console.log(error);
        this.openDialog('Une erreur s\'est produite lors de la récupération des réservations confirmées.');
      }
    );
  }
  // Méthode pour vérifier la disponibilité d'une voiture en fonction des dates de début et de fin des réservations confirmées
  // isVoitureDisponible(voitureId: number, dateDebut: Date, dateFin: Date): Observable<boolean> {
  //   return this.getConfirméesByVoitureId(voitureId).pipe(
  //     map((reservations: any[]) => {
  //       for (const reservation of reservations) {
  //         const reservationDateDebut = new Date(reservation.dateDebut);
  //         const reservationDateFin = new Date(reservation.dateFin);

  //         if (
  //           (dateFin < reservationDateDebut && dateDebut > reservationDateFin) ||
  //           (dateDebut > reservationDateFin && dateFin < reservationDateDebut)
  //         ) {
  //           continue;
  //         } else {
  //           return false; // La voiture n'est pas disponible
  //         }
  //       }

  //       return true; // La voiture est disponible
  //     })
  //   );
  // }
}
