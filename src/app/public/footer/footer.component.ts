import { Component,OnInit } from '@angular/core';

declare const google: any;
@Component({
  selector: 'app-footer',
  template: `
    <footer class="page-footer #00b8d4 cyan accent-4">
      <div class="container">
        <div class="row">
          <div class="col l3 s12 ">
            <h2 class="white-text">Horaires</h2>
            <p class="grey-text text-lighten-4">
              Lundi 08:00pm-06:00pm.
              Mardi 08:00pm-06:00pm.
              Mercredi 08:00pm-06:00pm.<br>
              Jeudi 08:00pm-06:00pm.
              Vendredi 08:00pm-06:00pm.
              Samedi 08:00pm-14:00pm.
            </p>
          </div>
          
          <div class="col l3  s12 ">
            <h2 class="white-text">Réseaux sociaux</h2>
            <ul>
              <li >
                <a class="grey-text text-lighten-3" href="https://www.facebook.com/NewDevMaroc">
                <i class="material-icons">facebook</i>Facebook
                </a>
              </li>
              <li >
                <a class="grey-text text-lighten-3" href="https://twitter.com/NewDevMaroc">
                <i class="material-icons blue"></i>Twitter
                </a>
              </li>
              <li >
                <a class="grey-text text-lighten-3" href="https://www.instagram.com/NewDevMaroc/">
                <i class="material-icons blue"></i>Instagram
                </a>
              </li>
              <li >
                <a class="grey-text text-lighten-3" href="https://www.linkedin.com/company/newdev-maroc">
                <i class="material-icons" style="max-width: 30px;margin-bottom: 10px;padding-bottom: 10px;">linkedin</i><span>LinkedIn</span> 
                </a>
              </li>
            </ul>
          </div>

          <div class="col s12 l6 center">
            <h2  class="white-text">Localisation</h2>
            <p >NewDev Maroc, Fès, Maroc</p>
            <div id="map"></div>
          </div>
        </div>
      </div>
          
          
      
        
      
          
      <div class="footer-copyright">
        <div class="container">
        © 2023 Copyright El Mehdi Echeouati
        <a class="grey-text text-lighten-4 right" href="#!">Fax:05 35 65 07 57</a>
        </div>
      </div>
    </footer>

  `,
  styles: [` 
    #map {
      height: 150px; /* Ajustez la hauteur selon vos besoins */
      background-color:grey;
    }
      .h3{
        color:blue;
      }

  `
    
  ]

})
export class FooterComponent implements OnInit {
  ngOnInit() {
    this.initMap();
  }

  initMap() {
    // Coordonnées GPS de l'entreprise NewDev Maroc à Fès
    const latitude = 34.0366;
    const longitude = -5.0076;
    
    // Options de la carte
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 15 // Ajustez le niveau de zoom selon vos besoins
    };

    // Création de la carte
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Marqueur pour la localisation de l'entreprise
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: 'NewDev Maroc, Fès'
    });
  }

}
