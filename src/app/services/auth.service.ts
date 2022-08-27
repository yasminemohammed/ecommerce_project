import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: any = 'http://localhost:8000/api/v1/';
  currentUserData: any = new BehaviorSubject(null);

  userRole: string = '';
  headers: any = new BehaviorSubject(null);

  myHeaders:any;

  httpOptions: any;

  user:any;

  constructor(private _HttpClient: HttpClient) {

    this.myHeaders = new HttpHeaders();
    this.httpOptions = {
      headers: new HttpHeaders(),
      withCredentials: true
    };

    if (localStorage.getItem('currentUser')) {

      this.saveUserData();
      console.log(this.headers.getValue());

      if (localStorage.getItem('updatedData')) {
        let userData = localStorage.getItem('updatedData');

        this.currentUserData.next(JSON.parse(userData!))
      }
    }
  }

  register(formData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this._HttpClient.post(`${environment.base_url}/register`, formData, this.httpOptions);
  }

  login(loginData: any): Observable<any> {
    return this._HttpClient.post(`${environment.base_url}/login`, loginData, this.httpOptions);
  }

  updateProfile(profileData: any): Observable<any> {

    return this._HttpClient.post(this.baseURL + 'user/info', profileData, this.httpOptions);
  }

  updatePassword(passwordData: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'user/password', passwordData, this.httpOptions);
  }

  saveUserData() {
    let encodeToken: any = localStorage.getItem('currentUser');

    let userJson = localStorage.getItem('user');
    this.user = userJson != null ? JSON.parse(userJson) : null;

    this.myHeaders = this.myHeaders.set('Authorization', 'Bearer ' + encodeToken);

    this.headers.next(this.myHeaders);

    this.currentUserData.next(this.user);
    this.userRole = this.currentUserData.getValue().roles[0].name

  }




}
