import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userdata } from '../userdata';
import { map } from "rxjs/operators";
import { catchError,retry } from 'rxjs/operators';

const AUTH_API = 'http://localhost:3000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: any;
  authToken: string | undefined;
  userlist: Userdata[] = [];
  selecteduser: any;

  constructor(private http: HttpClient) { }

  //Service for user register
  register(username: string, email: string, password: string, contact : number): Observable<any> {
    return this.http.post(AUTH_API + 'users/register', {
      username,
      email,
      password,
      contact
    }, httpOptions);
  }
  
  //Service for admin register
    adminregister(username: string, email: string, password: string): Observable<any> {
      return this.http.post(AUTH_API + 'admin/register', {
        username,
        email,
        password
      }, httpOptions);
    }

    //Service for user login
    userlogin(username: string, password: string): Observable<any> {
      return this.http.post(AUTH_API + 'users/login', {
        username,
        password
      }, httpOptions);
    }

    //Service for admin login
    adminlogin(username: string, password: string): Observable<any> {
      return this.http.post(AUTH_API + 'admin/login', {
        username,
        password
      }, httpOptions);
    }

    userdata() {
    return this.http.get(AUTH_API + 'users/userinfo');
     }

  //Service forget user list 
  getuser(id: string) {
    return this.http.get<{
      _id: string, name: string, email: string, job: string,
      creator: string;
    }>(
      AUTH_API +"users/userinfo" + id
    );
  }

  //Service for user update
  putUser(user: Userdata) {
    return this.http.patch(AUTH_API + `users/updateuser/${user._id}`, user);
  }

  //Service for create user 
  postuserdata(con: Userdata){
    return this.http.post(AUTH_API +"users/userinfo", con);
  }

  //Service for delete user 
  deleteuser(_id: string) {
    return this.http.delete(AUTH_API + `users/userdelete/${_id}` );
  }

  getPublicContent(): Observable<any> {
    return this.http.get(AUTH_API + 'all', { responseType: 'text' });
  }

  // getOwndetail() {
  //   return this.http.get(AUTH_API + 'users/userinfo');
  //    }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }


 getOwndetail(_id:string): Observable<any> {
      return this.http
        .get<any>(AUTH_API + `users/ownDetails/${_id}`)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    

}
