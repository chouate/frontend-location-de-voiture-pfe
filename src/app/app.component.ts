import { Component,OnInit } from '@angular/core';
import { VOIYURES } from './voiture/voiture-list';
import { Voiture } from './voiture/voiture';


@Component({
  selector: 'app-root',
  templateUrl : 'app.component.html',
  styleUrls: ['app.component.css']
  
})
export class AppComponent implements OnInit{

  voitureList : Voiture[] = VOIYURES;
  voitureSelected : Voiture | undefined ;

  constructor(){}

  ngOnInit(): void {}

  selectVoiture(event :MouseEvent){
    const index :  number= +(event.target as HTMLInputElement).value
   console.log(`vous avez choisi ${this.voitureList[index].name} `);
  }
  // selectVoitureById(voitureId : number){
  //   const voiture : Voiture | undefined= this.voitureList.find(voiture =>voiture.id ==voitureId )
  //   if(voiture){
  //     this.voitureSelected= voiture;
  //   }else
  //     this.voitureSelected=voiture;
    
  // }
  
}
