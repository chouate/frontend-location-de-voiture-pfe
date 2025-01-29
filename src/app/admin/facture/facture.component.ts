import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/voiture/client.service';
import { Voiture } from 'src/app/voiture/voiture';
import { VoitureService } from 'src/app/voiture/voiture.service';
import { Location } from '../model/location';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styles: [
  ]
})
export class FactureComponent implements OnInit{


  searchContratId: number ;
  NumFacture:number;
  client:any;
  voiture:Voiture|undefined;
  location: Location;
  enregistrementReussi: boolean=false;

  constructor(
    private clientService :ClientService,
    private voitureService :VoitureService,
    private http :HttpClient,

  ){}
  ngOnInit(): void {
    

    // this.clientService.getClientById(1).subscribe(
    //   client=>{
    //     this.client=client;
    //   }
    // )
    // this.voitureService.getVoitureById(3).subscribe(
    //   voiture => {
    //     this.voiture = voiture;
    //     //console.log(this.voiture);
    //   }
    // );
  }

  searchContrat(){
    if(this.searchContratId >0){
      this.http
      .get<Location>(`http://localhost:3000/locations/${this.searchContratId}`)
      .subscribe(
        (response) => {
          this.location = response
          console.table(response);
          this.clientService.getClientById(response.clientId).subscribe(
            client=>{
              this.client=client;
              console.table(this.client)
            }
          )
          this.voitureService.getVoitureById(response.voitureId).subscribe(
            voiture=>{
              this.voiture=voiture;
              console.table(this.voiture);
            }
          )
        },
        (error) => {
          console.error('Erreur lors de la récupération de location', error);
          alert('Aucune contrat avec ce Numéro !!')
          
        }
      );
    }else{
      alert('Veuillez saisir un N° du contrat valide !!')
    }
    
  }

  calculateNumberOfDays(): number {
    if (this.location) {
      const startDate = new Date(this.location.startDate);
      const endDate = new Date(this.location.endDate);
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
  calculerPrixTotalAssurance():number{
    const numberOfDays = this.calculateNumberOfDays();
    if (numberOfDays && this.voiture) {
      return numberOfDays * 20;
    }
    return 0;
  }
  calculateNumberOfDaysRetard(){
    if (this.location) {
      const dateRemise = new Date(this.location.dateRemise);
      const endDate = new Date(this.location.endDate);
      const timeDiff = dateRemise.getTime() - endDate.getTime();
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return numberOfDays;
    }
    return 0;
  }
  calculerPrixTotalPenalite(){
    const numberOfDays = this.calculateNumberOfDaysRetard();
    if (numberOfDays && this.voiture) {
      return numberOfDays * this.voiture.price*2;
    }
    return 0;
  }
  calculateTotalFacture(){
    const prixTotal=this.calculerPrixTotal();
    const PrixTotalAssurance=this.calculerPrixTotalAssurance();
    const prixTotalPenalite=this.calculerPrixTotalPenalite();
    this.enregistrementReussi=true;
    return prixTotal+PrixTotalAssurance+prixTotalPenalite;
  }
  imprimerContrat() {
    // Code pour l'impression du contrat
    window.print();
  }
 

}
