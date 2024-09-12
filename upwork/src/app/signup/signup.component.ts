import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private http: HttpClient, private authService: AuthService) { }
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  email: string = "";
  password: string = "";
  phoneNumber: string = "";
  registerError: string = "";

  onSignup() {
    // form validation
    const isEmailValid = /^\w+([\.-]?\w+)*@(gmail\.com|yahoo\.com|outlook\.com)$/.test(this.email);
    if (this.firstName.trim() === "" || this.lastName.trim() === "" || this.userName.trim() === "" || this.email.trim() === "" || this.password.trim() === "" || this.phoneNumber.trim() === "") {
      this.registerError = "Please fill all the fields";
      setTimeout(() => {
        this.registerError = '';
      }, 3000);
      return;
    }
    //email validation
    if (!isEmailValid) {
      this.registerError = "Please enter a valid email";
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
    //phone number validation
    if (this.phoneNumber.length !== 10) {
      this.registerError = "Phone number must be 10 digits";
      setTimeout(() => {
        this.registerError = '';
      }, 3000);
      return;
    }

    const signupData = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    }
    console.log(signupData);

    this.authService.registerUser(signupData).subscribe(
      (response) => {
        console.log(response);
        this.registerError = "User registered successfully";
        setTimeout(() => {
          this.registerError = '';
        }, 3000);
      },
      (error) => {
        console.log(error);
        const errorResponse = error.error;
        if (errorResponse && errorResponse.message) {
          this.registerError = errorResponse.message;
        } else if (errorResponse && errorResponse.error) {
          this.registerError = errorResponse.error;
        } else {
          this.registerError = 'Network error. We will back soon';
        }
        setTimeout(() => {
          this.registerError = '';
        }, 3000);
      }
    );

  }

}
