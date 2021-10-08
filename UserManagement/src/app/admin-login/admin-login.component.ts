import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {
  isLoginError : boolean = false;
  
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private flashMessage: FlashMessagesService,
    private router: Router,) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    var flashMessage = this.flashMessage;

    const { username, password } = this.form;
   
    this.authService.adminlogin(username, password).subscribe( data => {
        if(data['success']){
        console.log("username"+username);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['userinfo']);
        //this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
      }
      else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 5000});
      }
    },
        error => {
        this.errorMessage = error.error.message;
        console.log(this.errorMessage)
        this.isLoginFailed = true;
      }
    );
  }

  // reloadPage() {
  //   window.location.reload();
  // }
}

