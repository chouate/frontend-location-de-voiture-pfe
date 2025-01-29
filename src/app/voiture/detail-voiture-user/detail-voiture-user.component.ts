import { Component,OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from '../voiture.service';
import { VOIYURES } from '../voiture-list';

@Component({
  selector: 'app-detail-voiture-user',
  templateUrl: './detail-voiture-user.component.html',
  styles: [
  ]
})
export class DetailVoitureUserComponent implements OnInit {
  voitureList: Voiture[];
  voitureSelected: Voiture |undefined;
  userId : string|null;
  isReservation :boolean=false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private voitureService : VoitureService
  ){}

  ngOnInit(): void {
    

    this.voitureList=VOIYURES;
    const voitureId : string | null= this.route.snapshot.paramMap.get('voitureId');
    this.userId = this.route.snapshot.paramMap.get('userId');
    // if(voitureId){
    //   this.voitureSelected = this.voitureService.getVoitureById(+voitureId);
    // }
    if(voitureId){
       this.voitureService.getVoitureById(+voitureId)
       .subscribe(voiture =>this.voitureSelected =voiture)
    }
  }

  goToVouitureList(){
    this.router.navigate(['voitures/']);
  }
  goToModifierVoiture(voitureId:number){
    this.router.navigate(['/edit/voiture',voitureId]);
  }

  goToReserverVoiture(){
    const userId=localStorage.getItem("user")
    if(!userId){
      this.router.navigate(['/login']);
    }else if(this.voitureSelected){
      //this.router.navigate([`clientHome/${this.userId}/voiture/${this.voitureSelected.id}/reservation`]);
      this.router.navigate([`voitures/${this.voitureSelected.id}/reservation`])
    }
  }
 

}
