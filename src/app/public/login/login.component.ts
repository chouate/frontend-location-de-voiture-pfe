import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{
  public LoginForm ! : FormGroup;

  constructor(
    private formeBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router,
  ){}

  ngOnInit(): void {
    this.LoginForm=this.formeBuilder.group({
      email :[''],
      password : ['']
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(
      res =>{
        const user = res.find((a:any)=>{
                        return a.email === this.LoginForm.value.email &&
                         a.password=== this.LoginForm.value.password && a.idUser===this.LoginForm.value.id
                      });
        if(user){
          alert("Login Success");
          localStorage.setItem("user", user.id)
          
          this.router.navigate(['voitures']);
        }else{
          alert("user not found");
        }
          
      },
      err=>{
        console.log(err);
        alert("Somthing wnt wrong !!");
      }
    )

  }

}
// goToModifierVoiture(voitureId:number){
//   this.router.navigate(['/edit/voiture',voitureId])
// }