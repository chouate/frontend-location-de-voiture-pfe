import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
  <div class="row ">
    <div class="col m6 ">
      <h1 mat-dialog-title>Message</h1>
    </div>
    
    <div class="col m3 offset-m3   " mat-dialog-actions>
      <button class="red close material-icons" mat-button (click)="dialogRef.close()">close</button>
    </div>
    <div class="col m12 " mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
  </div>
   
    
  `,
  styles: [
  ]
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

}
