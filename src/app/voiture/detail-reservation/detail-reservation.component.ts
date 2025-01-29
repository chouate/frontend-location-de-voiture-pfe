import { Component,OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { VoitureService } from '../voiture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReservationCountService } from '../reservation-count.service';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styles: [
  ]
})
export class DetailReservationComponent implements OnInit{
 
  voitureSelected: Voiture |undefined;
 

  startDate: string;
  endDate: string;
  minStartDate: string;
  status:string;

  errorMessage: string = '';
  

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private voitureService : VoitureService,
    private http: HttpClient,
    private reservationCountService :ReservationCountService,
    
  ){}

  ngOnInit(): void {
    
    const today = new Date();
    this.startDate = this.formatDate(today);
    this.minStartDate = this.formatDate(today);
    this.status='En attente';
    const voitureId : string | null= this.route.snapshot.paramMap.get('voitureId');
   
    if(voitureId ){
       this.voitureService.getVoitureById(+voitureId)
       .subscribe(voiture =>this.voitureSelected =voiture) 
    }

   
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  goToVouitureList(){
    this.router.navigate(['voitures']);
  }
 

  
  


  submit() {
     // Vérifier la validité des champs de date avant de soumettre le formulaire
     if (!this.validateDates()) {
      return;
    }
    const reservationData = {
      startDate: this.startDate,
      endDate: this.endDate,
      carId: this.voitureSelected?.id,
      userId: localStorage.getItem('user'),
      status:this.status,
    };

    this.http.post('http://localhost:3000/reservation', reservationData)
      .subscribe(
        (response) => {
          console.log('Réservation ajoutée avec succès !', response);
          
          alert('Réservation ajoutée avec succès !');
          // Augmenter le nombre de nouvelles réservations dans le panier
              // this.incrementNouvellesReservations();
          this.reservationCountService.incrementNouvellesReservations();
          this.router.navigate(['/maReservation']);
          
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la réservation', error);
          // Gérer l'erreur et effectuer les actions appropriées
        }
      );


 
  }

  validateDates(): boolean {
    if (!this.startDate || !this.endDate) {
      return false;
    }

    const today = new Date();
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Définir la date actuelle à minuit pour une comparaison précise
    today.setHours(0, 0, 0, 0);

    // Vérifier si la date de début est inférieure à la date d'aujourd'hui
    if (start.getTime() < today.getTime()) {
      alert('La date de début ne peut pas être antérieure à la date d\'aujourd\'hui.');
      //this.errorMessage = "La date de début ne peut pas être antérieure à la date d'aujourd'hui.";
      return false;
    }

    // Comparer les dates
    if (end <= start) {
      // La date de fin est antérieure à la date de début
      alert('La date de fin doit être postérieure à la date de début.');
      //this.errorMessage = 'La date de fin doit être postérieure à la date de début.';
      return false;
    }

    // Effectuer ici d'autres validations spécifiques à vos besoins, par exemple, vérifier la plage de dates valide, etc.

    return true;
  }

  incrementNouvellesReservations(): void {
    this.http.get<any[]>('http://localhost:3000/reservationCount').subscribe(
      (reservationCount: any[]) => {
        const countEntry = reservationCount[0]; // Récupérer le premier élément du tableau
        const nouvellesReservations = +countEntry.nouvellesReservations; // Convertir en nombre
        const updatedCountEntry =  nouvellesReservations + 1  // Incrémenter le nombre de nouvelles réservations

       
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        this.http.patch('http://localhost:3000/reservationCount/0',{nouvellesReservations: updatedCountEntry}).subscribe(
          (response) => {
            console.log('Nombre de nouvelles réservations incrémenté avec succès !', response);
            alert('Nombre de nouvelles réservations incrémenté avec succès !');
          },
          (error) => {
            console.error('Erreur lors de l\'incrémentation du nombre de nouvelles réservations', error);
            alert('Erreur lors de l\'incrémentation du nombre de nouvelles réservations');
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre de nouvelles réservations', error);
        alert('Erreur lors de la récupération du nombre de nouvelles réservations');
      }
    );
  }

  
}
