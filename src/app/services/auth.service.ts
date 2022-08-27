import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   token = window.localStorage.getItem('auth-token');
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json' ,'Authorization':`Bearer  ${this.token}`})
  };
  baseURL:any = 'http://localhost:8000/api/v1/';
  currentUserData:any = new BehaviorSubject(null);
  userRole:string = '';
  headers:any = new BehaviorSubject(null);


  constructor(private _HttpClient:HttpClient)
  {
    if(localStorage.getItem('auth-user'))
    {
      if (localStorage.getItem('auth-user'))
      {
        let userData = localStorage.getItem('auth-user');
        this.currentUserData.next(JSON.parse(userData!))
      }
    }
  }



  updateProfile(email:any,name:any):Observable<any>
  {

    return this._HttpClient.put(this.baseURL+'/user/info', {email,name}, this.httpOptions);
  }

  updatePassword(password:any,password_confirm:any):Observable<any>
  {
    return this._HttpClient.put(this.baseURL+'/user/password', {password,password_confirm}, this.httpOptions);
  }




  saveUserData()
  {
    let encodeToken:any = localStorage.getItem('auth-user');
    this.headers.next(new HttpHeaders().set('Authorization', 'Bearer'+encodeToken));
    let decodeToken:any = jwtDecode(encodeToken);
    this.currentUserData.next(decodeToken);
    this.userRole = this.currentUserData.getValue().user.role

  }
}
