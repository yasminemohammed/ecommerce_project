import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseURL:any = 'http://localhost:8000/api/v1/';
  headers:any;

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
  {
    this.headers = this._AuthService.headers;

  }


  createReview(reviewsDATA:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'reviews', reviewsDATA, {headers:this.headers});
  }

  editReview(reviewsDATA:any, id:number):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+`reviews/${id}`, reviewsDATA, {headers:this.headers});
  }

  DeleteReview(id:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseURL+`reviews/${id}`, {headers:this.headers});
  }

}
