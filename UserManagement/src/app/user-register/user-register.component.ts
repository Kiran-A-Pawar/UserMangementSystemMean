import { Component, OnInit } from '@angular/core';
//import { ValidateService } from '../../service/validate.service';
import { AuthService } from '../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username,contact, email, password } = this.form;
    
    this.authService.register(username, contact, email, password).subscribe(
      data => {
        if(data){
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['userlogin']);
      }
      else{

      }
    },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );

  }
}