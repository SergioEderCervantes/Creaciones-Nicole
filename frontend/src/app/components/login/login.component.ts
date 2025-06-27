import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email!:string; 
  password!:string;
  error:boolean = false;
  constructor(private auth: AuthService, private router:Router) { }

  manageLogin(){
    const result = this.auth.login(this.email,this.password);
    console.log(result);
    if(result){
      this.router.navigate(['/admin'])
    } else{
      this.error = true
    }
  }


}
