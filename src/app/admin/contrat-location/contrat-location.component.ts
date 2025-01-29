import cli from '@angular/cli';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/voiture/client';
import { ClientService } from 'src/app/voiture/client.service';
import { Reservation } from 'src/app/voiture/reservation';
import { ReservationService } from 'src/app/voiture/reservation.service';
import { Voiture } from 'src/app/voiture/voiture';
import { VoitureService } from 'src/app/voiture/voiture.service';
import { Contrat } from '../model/contrat';
import { Location } from '../model/location';

@Component({
  selector: 'app-contrat-location',
  templateUrl: './contrat-location.component.html',
  styles: [
  ]
})
export class ContratLocationComponent implements OnInit{

  client:any
  voiture:Voiture|undefined;
  reservation: Reservation; 
  contratLocation: string; // Contenu du contrat de location
  numeroPermis: any;
  dateDelivrance: any;
  NumCheque:any;
  NumContrat:number;
  DateContrat:Date =new Date() ;
  location:Location;
  enregistrementReussi: boolean=false;
  

  constructor(
    private route :ActivatedRoute,
    private clientService :ClientService,
    private reservationService : ReservationService,
    private voitureService :VoitureService,
    private http :HttpClient,
    private router:Router,
  ){}

  ngOnInit(): void {
    const reservationId =this.route.snapshot.paramMap.get('reservationId');
    console.log('reservationId : ',reservationId);
    if(reservationId){
      this.reservationService.getReservationById(+reservationId).subscribe(
        reservation =>{
          this.reservation=reservation
          //console.log(this.reservation)
          // Appeler getVoitureById seulement après avoir obtenu la réservation
          this.voitureService.getVoitureById(this.reservation.carId).subscribe(
            voiture => {
              this.voiture = voiture;
              //console.log(this.voiture);
            }
          );
          this.clientService.getClientById(this.reservation.userId).subscribe(
            client=>{
              this.client=client;
              this.numeroPermis=client.numeroPermis;
              this.dateDelivrance=client.dateDelivrance;
              // this.NumCheque=client.NumCheque;
            }
          )
        }
       
      ); 
    }
    
   // this.genererContratLocation();
  }
  // calculateNumberOfDays(startDate: string, endDate: string): number {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const timeDiff = Math.abs(end.getTime() - start.getTime());
  //   const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return numberOfDays;
  // }
  calculateNumberOfDays(): number {
    if (this.reservation) {
      const startDate = new Date(this.reservation.startDate);
      const endDate = new Date(this.reservation.endDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return numberOfDays;
    }
    return 0;
  }
  calculerPrixTotal():number{
    const numberOfDays = this.calculateNumberOfDays();
    if (numberOfDays && this.voiture) {
      return numberOfDays * this.voiture.price;
    }
    return 0;
  }
  
  async enregistrerInformations() {
    // Vérifiez si les valeurs sont définies
    if (this.numeroPermis && this.dateDelivrance && this.NumCheque) {
      const apiUrl = `http://localhost:3000/signupUsers/${this.client.id}`; 
      console.log('num permit :',this.numeroPermis,'delevre le :',this.dateDelivrance,)
      const dataClient = {
        numeroPermis: this.numeroPermis,
        dateDelivrance: this.dateDelivrance,
        clientId: this.client.id, // Supposons que vous avez un ID de client déjà défini
        
      };
      this.ajouterLocation();
      this.ajouterContrat();
      this.transformerReservation(this.reservation);
      // Effectuez la requête HTTP POST vers l'API
      this.http.patch(apiUrl, dataClient).subscribe(
        response => {
          // this.ajouterLocation();
          // this.ajouterContrat();
          
          console.log('Enregistrement réussi', response);
          this.enregistrementReussi = true;
          
          
        },
        error => {
          console.error('Erreur lors de l\'enregistrement', error);
        }
      );
    }else{
      console.log('veuillez saisir tous les champs conçernat les informations de permis et le cheque !')
      alert('veuillez saisir tous les champs conçernat les informations de permis et le chèque!');
    }
   
  }
  transformerReservation(reservation: any) {
    this.reservationService.convertirReservation(reservation.id).subscribe(
      (data) => {
        // Mettre à jour le statut de la réservation dans la liste
        //reservation.status = 'transformée';
      },
      (error) => {
        console.log(error);
      }
    );
  }
   ajouterLocation() {
    // Vérifiez si les valeurs sont définies
    if (this.reservation) {
      const apiUrl = `http://localhost:3000/locations`;
      const dataLocation = {
        startDate: this.reservation.startDate,
        endDate: this.reservation.endDate,
        clientId: this.reservation.userId,
        voitureId: this.reservation.carId,
        status: 'En cours',
        dateRemise: ''
      };
      // Effectuez la requête HTTP PUT vers l'API pour ajouter la location
      this.http.post<Location>(apiUrl, dataLocation).subscribe(
        response => {
          console.log('Location ajoutée avec succès', response);
          this.location=response;
        },
        error => {
          console.error('Erreur lors de l\'ajout de la location', error);
        }
      );
    }
  }
   ajouterContrat(){
    if(this.voiture   ){
      const apiUrl = `http://localhost:3000/contrat`;
      //const locationId = await this.getLocationId(); // Récupérer l'ID de location

      const dataContrat={
        penaliteJour:this.voiture.price*2,
        dateContrat:this.DateContrat,
        numCheque : this.NumCheque,
        // locationtId:await this.getLocationId(),
        //locationtId: this.location.id,
        //datePronlongement:Date,
      }
       this.http.post<Contrat >(apiUrl,dataContrat).subscribe(
        response =>{
          this.NumContrat=response.id;   
          console.log('contrat ajoutée avec succès',response);
          //console.log('panalite :',response.penaliteJour);
        },
        error =>{
          console.log('Erreur lors de l\'ajout de la contrat',error);
        }
      )
    }
  }
  async getLocationId(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.location && this.location.id) {
        resolve(this.location.id);
      } else {
        // Si l'id de la location n'est pas encore disponible, vous pouvez attendre et réessayer après un certain délai
        setTimeout(() => {
          this.getLocationId().then(resolve).catch(reject);
        }, 2000); // Délai de 200 millisecondes, à ajuster si nécessaire
      }
    });
  }

  // async ajouterContrat() {
  //   if (this.voiture && this.location) {
  //     const apiUrl = `http://localhost:3000/contrat`;
  //     const dataContrat = {
  //       penaliteJour: this.voiture.price * 2,
  //       dateContrat: this.DateContrat,
  //       locationtId: await this.getLocationId(),
  //       datePronlongement: Date,
  //     };
  
  //     try {
  //       const response = await this.http.post<Contrat>(apiUrl, dataContrat).toPromise();
  //       if(response){
  //         this.NumContrat = response.id;
  //         console.log('contrat ajouté avec succès', response);
  //       }
        
  //     } catch (error) {
  //       console.log('Erreur lors de l\'ajout du contrat', error);
  //     }
  //   }
  // }
  
  genererContratLocation() {
    // Récupérer les informations de la réservation
    const reservationId = this.reservation.id;
    const userId = this.reservation.userId;
    const carId = this.reservation.carId;
    const startDate = this.reservation.startDate;
    const endDate = this.reservation.endDate;
    // Autres informations de la réservation...

    // Générer le contenu du contrat
    this.contratLocation = `


      Contrat de Location 
      ----------------------------

      Numéro de réservation : ${reservationId}
      Identifiant du client : ${userId}
      Identifiant de voiture : ${carId}
      Date de début : ${startDate}
      Date de fin : ${endDate}

      // Ajouter les autres informations du contrat...

      Conditions générales :
      - Le client est responsable de l'utilisation et de l'entretien du véhicule loué.
      - Le véhicule doit être restitué dans le même état qu'au début de la location.

      Signature et cachet de l'agence:                                     Signature du client:
    `;
  }

  imprimerContrat() {
    // Code pour l'impression du contrat
    window.print();
  }
  goToResevationsList(){
    this.router.navigate(['admin/reservations']);
  }
}
