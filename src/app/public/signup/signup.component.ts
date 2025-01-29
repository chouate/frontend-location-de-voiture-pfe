import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit{
  public signupForm !: FormGroup;

  constructor(
    private formBuilder :FormBuilder,
    private http :HttpClient,
    private router :Router,
  ){}

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      nom:[''],
      prenom:[''],
      cin:[''],
      email:[''],
      telephone : [''],
      password : ['']

    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    .subscribe(res =>{
      alert("signup Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err =>{
        console.log(err);
        alert("Somthing went wrong")
      }

    )
  }

}
