import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Location } from '../model/location';
import { ReservationService } from 'src/app/voiture/reservation.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-location-admin',
  templateUrl: './location-admin.component.html',
  styles: [
  ]
})
export class LocationAdminComponent implements OnInit {
  locations: Location[] = [];
  newLocation: any = {};
  dateRemise: any;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pages: number[] = [];
  reversedLocations: Location[];
  searchLocationId: number ;
  locationCherchee:any;

  constructor(
    private http: HttpClient,
    private reservationService:ReservationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.http
      .get<any[]>('http://localhost:3000/locations')
      .subscribe(
        (response) => {
          this.locations = response.reverse();
          this.updatePagination(); // Mettre à jour la pagination après récupération des données
          this.updateReversedLocations(); // Afficher les locations pour la page courante
        },
        (error) => {
          console.error('Erreur lors de la récupération des locations', error);
        }
      );
  }

  deleteLocation(locationId: number): void {
    this.http
      .delete(`http://localhost:3000/locations/${locationId}`)
      .subscribe(
        (response) => {
          console.log('Location supprimée avec succès !', response);
          this.fetchLocations(); // Mettre à jour la liste des locations après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la location', error);
        }
      );
  }

  createLocation(): void {
    this.http
      .post('http://localhost:3000/locations', this.newLocation)
      .subscribe(
        (response) => {
          console.log('Location ajoutée avec succès !', response);
          this.fetchLocations(); // Mettre à jour la liste des locations après création
          this.newLocation = {}; // Réinitialiser les valeurs du formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la location', error);
        }
      );
  }

  ajouterDateRemise(location:Location){
    
    if (this.dateRemise  ) {
      if(this.dateRemise >= location.endDate){
        const apiUrl = `http://localhost:3000/locations/${location.id}`;
        const dataLocation = {
          status:'teminée',
          dateRemise:this.dateRemise
        };
        // Effectuez la requête HTTP POST vers l'API
        this.http.patch(apiUrl, dataLocation).subscribe(
          response => {
          this.fetchLocations();
            
          },
          error => {
            console.error('Erreur lors de l\'enregistrement de date de remise', error);
            alert('Erreur lors de l\'enregistrement de date de remise');
          }
        );
      }else{
        alert('la date de remise doit etre égale ou supérieure à la date de fin !')
        this.dateRemise=''
      }
      
    }else{
      console.log('veuillez saisir la date de remise !')
      alert('veuillez saisir la date de remise !')
    }

  }
  // updateReversedReservations(): void {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.reversedReservations = this.reservations.slice(startIndex, endIndex);
  // }

  // updatePagination(): void {
  //   const totalPages = Math.ceil(this.reservations.length / this.itemsPerPage);
  //   this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // }
  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updateReversedReservations();
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.pages.length) {
  //     this.currentPage++;
  //     this.updateReversedReservations();
  //   }
  // }

  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.pages.length) {
  //     this.currentPage = page;
  //     this.updateReversedReservations();
  //   }
  // }
  updateReversedLocations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.reversedLocations = this.locations.slice(startIndex, endIndex);
  }
  
  updatePagination(): void {
    const totalPages = Math.ceil(this.locations.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateReversedLocations();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.updateReversedLocations();
    }
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.updateReversedLocations();
    }
  }
  searchLocation() {
    if (this.searchLocationId > 0) {
      // Appeler le service pour récupérer la réservation par son numéro
      this.reservationService.getLocationById(this.searchLocationId).subscribe(
        (reservation) => {
          
          this.locationCherchee = reservation;
         
        },
        (error) => {
          console.log(error);
          this.locationCherchee = null;
          this.openDialog('Aucune location trouvée avec ce numéro.');
        }
      );
    } else {
      // Numéro de location non valide
      this.locationCherchee = null;
      this.openDialog('Veuillez saisir un numéro de location valide.');
    }
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
}
