import { Component } from '@angular/core';

@Component({
  selector: 'app-addbtn',
  template: `
    <a 
    class="btn-floating btn-large waves-effect waves-light red z-depth-3"
    style="position: fixed; bottom: 25px; right: 25px;"
    routerLink="/voiture/add"
    >
    ➕
    </a>
  `,
  styles: [
  ]
})
export class AddbtnComponent {

}
