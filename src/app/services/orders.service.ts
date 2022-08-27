import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL: any = 'http://localhost:8000/api/v1/';
  headers: any;

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService)
  {
    this.headers = this._AuthService.headers;

  }

  getAllorders():Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/orders`);
  }
  getOrder(id:any):Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/orders/${id}`);
  }




}
