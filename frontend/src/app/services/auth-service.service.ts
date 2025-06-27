import { Injectable } from '@angular/core';
import { Admin } from '../models/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  admin: Admin;
  logguedIn: boolean = false;
  constructor() {
    this.admin = {
      username: "Admin",
      email: "creacionesnicole@gmail.com",
      password: "contra123"
    }
    this.isLogguedIn = JSON.parse(localStorage.getItem("isLogguedIn") || "false");
    localStorage.setItem("isLogguedIn", JSON.stringify(this.isLogguedIn))
  }

  isLogguedIn() {
    return this.logguedIn
  }


  login(email: string, password: string): boolean {
    if (this.admin.email === email && this.admin.password === password) {
      this.logguedIn = true;
      localStorage.setItem("isLogguedIn", JSON.stringify(this.isLogguedIn));
      return true;
    } else {
      return false;
    }
  }
  
  logout(){
    this.logguedIn = false;
    localStorage.setItem("isLogguedIn", JSON.stringify(this.isLogguedIn));
  }
}
