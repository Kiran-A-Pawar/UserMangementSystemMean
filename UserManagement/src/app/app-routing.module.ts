import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { HomeComponent } from './home/home.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'user-register', component:  UserRegisterComponent  },
  { path: 'profile', component: ProfileComponent },
  { path: 'userinfo', component: UserinfoComponent },
  { path: 'logout', component: LogOutComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }