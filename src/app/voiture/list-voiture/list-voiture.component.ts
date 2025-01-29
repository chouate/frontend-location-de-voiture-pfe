import { Component,OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from '../voiture.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-voiture',
  templateUrl: 'list-voiture.component.html',
  styles: [
  ]
})
export class ListVoitureComponent implements OnInit{
  voitureList : Voiture[]  ;
 
  

  constructor(
    private router :Router,
    private voitureService: VoitureService,
    private route : ActivatedRoute,
    
  ){}

  goToVoiture(voiture : Voiture){
    this.router.navigate(['/admin/voiture',voiture.id])
  }
  ngOnInit(): void {
    this.voitureService.getVoitureList()
    .subscribe(voitureList => this.voitureList = voitureList);
   
    
    // this.voitureService.getVoitureList().subscribe(
    //   (voitureList) => {
    //     this.voitureList = voitureList;
    //   },
    //   (erreur) => {
    //     this.voitureList = this.voitureService.getFakeVoitures();
    //     //alert(`Problème de connexions les donnèes sont fictives :(`);
    //   }
    // );
    //this.voitureList = this.voitureService.getVoitureList();

   
  }

}
