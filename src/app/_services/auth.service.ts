import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8000/api/v1/';
const token = window.localStorage.getItem('auth-token');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json' ,'Authorization':`Bearer  ${token}`})
};
console.log(httpOptions);
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserData: any;
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }
  register(name: string, email: string, password: string , password_confirm:string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      name,
      email,
      password,
      password_confirm,
    }, httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }
}
