import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL:any = 'http://localhost:8000/api/v1/products';
  headers:any;

  constructor(private _HttpClient:HttpClient)
  {


  }

  getAllCat():Observable<any>
  {
    return this._HttpClient.get('http://localhost:8000/api/v1/categories');
  }

  createCat(catData:any):Observable<any>
  {
    return this._HttpClient.post('http://localhost:8000/api/v1/admin/categories', catData);
  }

  editCat(catData:any, id:number):Observable<any>
  {
    return this._HttpClient.post(`http://localhost:8000/api/v1/admin/categories/${id}`, catData);
  }

  DeleteCat(id:number):Observable<any>
  {
    return this._HttpClient.delete(`http://localhost:8000/api/v1/admin/categories/${id}`);
  }

  // Products

  getAllProducts(pValue:any = null):Observable<any>
  {
    return this._HttpClient.get(`http://localhost:8000/api/v1/products`);
  }
  getProductsPerPage(pValue:any = null):Observable<any>
  {
    return this._HttpClient.get(`http://localhost:8000/api/v1/products?page=${pValue}`);
  }
  getProductById(id:any):Observable<any>
  {
    return this._HttpClient.get(this.baseURL+`/${id}`);
  }

  getProductByPrice(min_price:any, max_price:any):Observable<any>
  {
    return this._HttpClient.get(`http://localhost:8000/api/v1/products?price=${min_price}-${max_price}`);
  }
  getProductByCat(catValue:any):Observable<any>
  {
    return this._HttpClient.get(`http://localhost:8000/api/v1/products?category=${catValue}`);
  }

  // Products CRUD

  createProduct(proData:any):Observable<any>
  {
    return this._HttpClient.post('http://localhost:8000/api/v1/admin/products', proData);
  }

  editProduct(proData:any, id:number):Observable<any>
  {
    return this._HttpClient.post(`http://localhost:8000/api/v1/admin/products/${id}`, proData);
  }

  deleteProduct(id:number):Observable<any>
  {
    return this._HttpClient.delete(`http://localhost:8000/api/v1/admin/products/${id}`);
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
