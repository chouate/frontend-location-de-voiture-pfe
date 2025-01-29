import { Component,OnInit } from '@angular/core';
declare const M: any;

@Component({
  selector: 'app-home',
  template: `
  <div  class="center " style="margin-top: 100px; margin-left:-50px">
    <h1 >Bienvenue sur notre site de location de voitures</h1>
    <p>Commencez dès maintenant à trouver la voiture parfaite pour votre prochaine aventure.</p>
    <!-- <button class="btn btn-primary ">Rechercher une voiture</button> -->
    <a routerLink='voitures' class="waves-effect waves-light btn-large "><i class="material-icons"> local_car_wash insert_emoticon</i> Rechercher une voiture   <i class="material-icons"> local_car_wash insert_emoticon</i> </a>

  </div>
  <div style="">
  <img style="margin-left: 250px; " class="center" src="https://cdn-s-www.ledauphine.com/images/9981693B-3889-40F8-8EA1-BC2D4B437A2C/NW_detail_M/afin-d-eviter-la-possible-hausse-des-tarifs-a-l-entree-de-l-ete-la-nouvelle-tendance-est-a-l-anticipation-les-francais-ont-tendance-a-reserver-deux-mois-a-l-avance-leur-vehicule-photo-dr-1643019159.jpg">
  </div>
  
   
    <style>
      h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
      }

      p {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
      }

      .btn-primary {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      /* *************************** */
     
    </style>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit{
  showMenu: boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }



  ngOnInit(): void {
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav);
  }

}
