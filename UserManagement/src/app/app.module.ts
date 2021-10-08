import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LogOutComponent } from './log-out/log-out.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    UserRegisterComponent,
    UserLoginComponent,
    AdminLoginComponent,
    UserinfoComponent,
    HomeComponent,
    ProfileComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [AuthService, FlashMessagesService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
