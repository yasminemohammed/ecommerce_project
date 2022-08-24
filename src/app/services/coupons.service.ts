import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {



  baseURL:any = 'http://localhost:8000/api/v1/';
  headers:any;

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
  {
    this.headers = this._AuthService.headers;

  }


  applyCopoun(Copoun:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'coupons', Copoun,{headers:this.headers});
  }


  deleteCopoun(id:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseURL+`coupons/${id}`,{headers:this.headers});
  }



}


















