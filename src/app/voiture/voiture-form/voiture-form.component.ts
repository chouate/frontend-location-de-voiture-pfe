import { Component,Input,OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from '../voiture.service';

@Component({
  selector: 'app-voiture-form',
  templateUrl: './voiture-form.component.html',
  styles: [
  ]
})
export class VoitureFormComponent implements OnInit{
  @Input() voiture: Voiture ;
  //voiture : Voiture |undefined;
  types : string[]
  checkBoxValue :number ;
  isChecked1 :boolean;
  isChecked2 :boolean;
  isAddForm: boolean;
  carburantSelected: boolean = true;

  constructor(
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private router : Router,
  ){}

  ngOnInit(): void {
      //this.types= this.voitureService.getVoitureCarburantList();
    const voitureId :string | null = this.route.snapshot.paramMap.get('id');
    if(voitureId){
      //this.voiture = this.voitureService.getVoitureById(+voitureId);
      // this.voitureService.getVoitureById(+voitureId)
      // .subscribe(voiture => this.voiture = voiture)
      
      const voitureSelected =this.voiture
      if(voitureSelected){
        this.isChecked1 =  this.hasType1(voitureSelected.carburant );
        this.isChecked2 =  this.hasType2(voitureSelected.carburant );
      }
    }
    this.isAddForm = this.router.url.includes('add');

    
    
  }

 
  //*******************************************************************************/
  hasType1(type :String):boolean{
    if(type==="diesel"){
      return true 
    }else
    return false;
  }
  hasType2(type :String):boolean{
    if(type==="essence"){
      return true 
    }else
    return false;
  }
  onCheck1Change($event: Event ) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.isChecked2 = false;
      this.voiture.carburant='diesel';
    }
    this.isChecked1 = ($event.target as HTMLInputElement).checked;
    this.carburantSelected = this.isChecked1 || this.isChecked2;
  }

  onCheck2Change($event: Event) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.isChecked1 = false;
      this.voiture.carburant='essence';
    }
    this.isChecked2 = ($event.target as HTMLInputElement).checked;
    this.carburantSelected = this.isChecked1 || this.isChecked2;
  }
  //*******************************************************************************/
  onSubmit(){
    if(this.isAddForm){
      this.voitureService.addVoiture(this.voiture)
      .subscribe( ()=> this.router.navigate(['/admin/voiture',this.voiture.id]) );
      
    }else 
    this.voitureService.updateVoiture(this.voiture)
    .subscribe( ()=> this.router.navigate(['/admin/voiture',this.voiture.id]) )
    }
 

}
 