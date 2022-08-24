import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL:any = 'http://localhost:8000/api/v1/';
  headers:any;

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
  {
    this.headers = this._AuthService.headers;

  }

  getAllCat():Observable<any>
  {
    return this._HttpClient.get(this.baseURL+'categories?all=1');
  }

  createCat(catData:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'categories', catData, {headers:this.headers});
  }

  editCat(catData:any, id:number):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+`categories/${id}`, catData, {headers:this.headers});
  }

  DeleteCat(id:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseURL+`categories/${id}`, {headers:this.headers});
  }

  // Productssss

  getAllProducts(pValue:any = null):Observable<any>
  {
    return this._HttpClient.get(this.baseURL+`products?all=1`);
  }
  getProductsPerPage(pValue:any = null):Observable<any>
  {
    return this._HttpClient.get(this.baseURL+`products?all=1&category=${pValue}`);
  }
  getProductById(id:any):Observable<any>
  {
    return this._HttpClient.get(this.baseURL+`products/${id}`);
  }
  getProductByCat(catValue:any):Observable<any>
  {
    return this._HttpClient.get(this.baseURL+`products?all=1&category=${catValue}`);
  }

  // Products CRUD

  createProduct(proData:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'products', proData, {headers:this.headers});
  }

  editProduct(proData:any, id:number):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+`products/${id}`, proData, {headers:this.headers});
  }

  deleteProduct(id:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseURL+`products/${id}`, {headers:this.headers});
  }

  // Approvallll

  getUnApproveProduects():Observable<any>
  {
    return this._HttpClient.get(this.baseURL+'products?unapproved', {headers:this.headers})
  }

  changeProductStatus(status:string, id:number):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+`products/${id}/approval`, status, {headers:this.headers});
  }



}
