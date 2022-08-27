import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseURL:any = 'http://localhost:8000/api/v1/';
  headers:any;

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
  {
    this.headers = this._AuthService.headers;

  }
  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(this.baseURL+'categories?all=1');
  }
}
