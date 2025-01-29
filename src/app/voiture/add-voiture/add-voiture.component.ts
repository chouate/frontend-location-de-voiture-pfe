import { Component,OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { VoitureService } from '../voiture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-voiture',
  template: `
    <h2 class="center">Ajouter une  nouvelle voiture au service </h2>
   <!-- <app-voiture-form  [voiture]="voiture"]></app-voiture-form> -->
   


<form *ngIf="voiture" (ngSubmit)="onSubmit()" #voitureForm="ngForm">
    <div class="row">
      <div class="col s8 offset-s2">
        <div class="card-panel">
    
          <!-- Voiture name -->
          <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" class="form-control" id="name"
                   
                    pattern="^[a-zA-Z0-9àéèç ]{1,100}$"
                   [(ngModel)]="voiture.name" name="name"
                   #name="ngModel">
    
            <div [hidden]="name.valid || name.pristine"
                  class="card-panel red accent-1">
                  Le nom de voiture est requis (1-100).
            </div>
          </div>
          <!-- Voiture imageUrl -->
          <div class="form-group">
            <label for="imageUrl">Image URL :</label>
            <input type="url" class="form-control" id="imageUrl"
                  required
                   [(ngModel)]="voiture.imageUrl" name="imageUrl"
                   #imageUrl="ngModel">
            
            <div [hidden]="imageUrl.valid || imageUrl.pristine"
                  class="card-panel red accent-1">
                  L'URL de voiture est requis .
            </div>
          </div>

          <!-- voiture type -->
          <div class="form-group">
            <label for="type" >type :</label>
            <input type="text" class="form-control" id="type"
                   required
                    pattern="^[a-zA-Zàéèç]{1,40}$"
                   [(ngModel)]="voiture.type" name="type"
                   #type="ngModel">
             <div [hidden]="type.valid || type.pristine"
                   class="card-panel red accent-1">
                   le type de voiture est requis.
             </div>
          </div>
         
            <!-- Voiture type -->
            <!-- <div class="form-group">
              <label for="type">Type :</label>
              <select class="form-control" id="type" required [(ngModel)]="voiture.type" name="type" #type="ngModel">
                <option value="" disabled selected>Choisissez le type de voiture</option>
                <option value="sport">Sport</option>
                <option value="compact">Compact</option>
              </select>

              <div [hidden]="type.valid || type.pristine" class="card-panel red accent-1">
                Le type de voiture est requis.
              </div>
            </div> -->
          <!-- voiture carburant -->
          <form class="form-group">
            <label for="carburant">Carburant :</label>
            <div >
              <p>
                <label>
                  <input 
                  type="checkbox" 
                  required
                  [defaultChecked]="hasType1(voiture.carburant)"
                  [checked]="isChecked1" 
                  (change)="onCheck1Change($event)">
                  <span>Diesel</span>
                </label>
              </p>
            </div>
            <div >
              <p>
                <label>
                  <input 
                  type="checkbox"
                  required 
                  [defaultChecked]="hasType2(voiture.carburant)"
                  [checked]="isChecked2" 
                  (change)="onCheck2Change($event)">
                  <span>Essence</span>
                </label>
              </p>
            </div>
          </form>

          <!-- voiture price -->
          <div  class="form-group">
            <label for="price">Prix de location :</label>
            <input type="number" class="form-control" id="price"
                    required                   
                    pattern="^[0-9]{1,5}$"
                    [(ngModel)]="voiture.price" name="price"
                    #price="ngModel">
    
            <div [hidden]="price.valid || price.pristine"
                  class="card-panel red accent-1">
                  Le prix de voiture est requise.
            </div>
          </div>
          <!-- voiture numberOfDoors -->
          <div  class="form-group">
            <label for="numberOfDoors">Nombre de portes:</label>
            <input type="number" class="form-control" id="numberOfDoors"
                    required
                    pattern="^[1-6]{1,1}$"
                    [(ngModel)]="voiture.numberOfDoors" name="numberOfDoors"
                    #numberOfDoors="ngModel">
    
            <div [hidden]="numberOfDoors.valid || numberOfDoors.pristine"
                  class="card-panel red accent-1">
                  Le nombre de portes de voiture est requise
                  (entre 2 et 6 portes).
            </div>
          </div>
          <!-- voiture numberOfBags -->
          <div  class="form-group">
            <label for="numberOfBags">Nombre de sacs :</label>
            <input type="number" class="form-control" id="numberOfBags"
                    required
                    pattern="^[0-6]{1,1}$"
                    [(ngModel)]="voiture.numberOfBags" name="numberOfBags"
                    #numberOfBags="ngModel">
    
            <div [hidden]="numberOfBags.valid || numberOfBags.pristine"
                  class="card-panel red accent-1">
                  Le nombre de sacs de voiture est requise
                  (entre 0 et 6 sacs).
            </div>
          </div>

          <!-- voiture numberOfSeats -->
          <div  class="form-group">
            <label for="numberOfSeats">Nombre de  places :</label>
            <input type="number" class="form-control" id="numberOfSeats"
                    required
                    pattern="^[2-8]{1,1}$"
                    [(ngModel)]="voiture.numberOfSeats" name="numberOfSeats"
                    #numberOfSeats="ngModel">
    
            <div [hidden]="numberOfSeats.valid || numberOfSeats.pristine"
                  class="card-panel red accent-1">
                  Le nombre de place de voiture est requise 
                  (entre 2 et 8 places).
            </div>
          </div>
          
          
    
          <!-- Submit button -->
          <div class="divider"></div>
          <div class="section center">
            <button type="submit"
              class="waves-effect waves-light btn"
              [disabled]="!voitureForm.form.valid || !carburantSelected "
            >
              Valider</button>
          </div>
    
        </div>
      </div>
    </div>
  </form>
  <h3 *ngIf="!voiture" class="center">
    <h1>acune voiture a modifier</h1>
    
  </h3>
  
<!-- <app-loader></app-loader> -->

    
    
  

  `,
  
  styles: [
  ]
})
export class AddVoitureComponent implements OnInit{
  voiture: Voiture;
  isChecked1 :boolean;
  isChecked2 :boolean;
  carburantSelected: boolean = false;
  carburant: string = '';

  constructor(
    private voitureService:VoitureService,
    private router: Router,
  ){}

  ngOnInit() {
    this.voiture = new Voiture();
  }
  onSubmit(){
    this.voitureService.addVoiture(this.voiture)
      .subscribe( (voiture: Voiture)=> this.router.navigate(['/admin/voiture',voiture.id]) );
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

}
