import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  baseURL:any = 'http://localhost:8000/api/v1/';
  headers:any;

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
   {

    this.headers = this._AuthService.headers;

   }

  getAllSliders():Observable<any>
  {
    return this._HttpClient.get(this.baseURL+`sliders?all=1`);
  }

}



