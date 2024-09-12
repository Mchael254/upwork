import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private router: Router) { }
  registerError: string = "";
  userName: string = "";
  password: string = "";

  
  loginUser() {
    //form validation
    if (this.userName.trim() === "" || this.password.trim() === "") {
      this.registerError = "Please fill all the fields";
      setTimeout(() => {
        this.registerError = '';
      }, 3000);
      return;
    }
    //password validation
    if (this.password.length < 8) {
      this.registerError = "Password must be at least 8 characters";
      setTimeout(() => {
        this.registerError = '';
      }, 3000);
      return;
    }
    console.log('Login successful');
    this.router.navigate(['/user']);
  }
}
