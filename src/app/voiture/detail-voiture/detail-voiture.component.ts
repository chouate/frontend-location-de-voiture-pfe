import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from '../voiture';
import { VOIYURES } from '../voiture-list';
import { VoitureService } from '../voiture.service';

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styles: [
  ]
})
export class DetailVoitureComponent implements OnInit {
  voitureList: Voiture[];
  voitureSelected: Voiture |undefined;
  testReservation:boolean=false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private voitureService : VoitureService
  ){}

  ngOnInit(): void {
    this.voitureList=VOIYURES;
    const voitureId : string | null= this.route.snapshot.paramMap.get('id')
    const test:string|null =this.route.snapshot.paramMap.get('reservationId')
    // if(voitureId){
    //   this.voitureSelected = this.voitureService.getVoitureById(+voitureId);
    // }
    if(voitureId){
       this.voitureService.getVoitureById(+voitureId)
       .subscribe(voiture =>this.voitureSelected =voiture)
    }

    if(test){
      this.testReservation=true;
    }
  }

  goToVouitureList(){
    this.router.navigate(['admin/voitures']);
  }
  goToReservationList(){
    this.router.navigate(['admin/reservations']);
  }
  goToModifierVoiture(voitureId:number){
    this.router.navigate(['/edit/voiture',voitureId])
  }

  deleteVoiture(voiture : Voiture){
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if(res){
      this.voitureService.deleteVoitureById(voiture.id)
      .subscribe(
        ()=> this.goToVouitureList()
      )
    }
    
  }

}
