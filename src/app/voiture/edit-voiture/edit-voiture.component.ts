import { Component ,OnInit} from '@angular/core';
import { VoitureService } from '../voiture.service';
import { ActivatedRoute } from '@angular/router';
import { Voiture } from '../voiture';

@Component({
  selector: 'app-edit-voiture',
  template: `
    <h2 class="center">
      editer  
    </h2>
    <p class="center">
    <img style="scroll-margin-top: 50px;" [src]="voiture?.imageUrl" />
    </p>

    <app-voiture-form  *ngIf="voiture" [voiture]="voiture"></app-voiture-form>
  `,
  styles: [
  ]
})
export class EditVoitureComponent implements OnInit {
  voiture: Voiture|undefined;
 
  constructor(
    private voitureService :VoitureService,
    private route : ActivatedRoute,
  ){}
  ngOnInit() {

    const voitureId: string|null = this.route.snapshot.paramMap.get('id');
    if(voitureId){
      //this.voitureToEdit = this.voitureService.getVoitureById(+voitureId);
      this.voitureService.getVoitureById(+voitureId)
      .subscribe(voiture => this.voiture = voiture );
    }
  }

}
