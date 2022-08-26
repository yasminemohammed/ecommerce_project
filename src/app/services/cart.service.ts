import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';

declare let $:any;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL:any = 'http://localhost:8000/api/v1/';
  token = window.localStorage.getItem('auth-token');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json' ,'Authorization':`Bearer  ${this.token}`})
  };
  cartData:any = new BehaviorSubject([])
  cartItemsLength:any = new BehaviorSubject(0)
  cartTotalValue:any = new BehaviorSubject(0)



  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
  {
   this.showCartData()
  }
    // Carttttttt

    getCartData():Observable<any>
    {
        return this._HttpClient.get(this.baseURL+'cart', this.httpOptions)
    }

    showCartData()
    {
      if(this._AuthService.currentUserData.getValue())
      {
        this.getCartData().subscribe((resp)=>
        {
          this.cartData.next(resp.data);
          console.log(resp.data)
          this.cartItemsLength.next(resp.data.length);
          this.getCartTotal()

        },(errors)=>
        {
          console.log(errors);
        })
      }

  }
    addToCart(id: number):Observable<any>
    {
      $('.fa-bag-shopping').addClass('fa-bounce');
    let productData =
      {
        'id':id
      }
    return this._HttpClient.post(this.baseURL+'cart', productData ,this.httpOptions);
}

    getCartTotal()
    {
      let cartSubtotal = 0;
      console.log(this.cartData.getValue());
      for (let currentItem of this.cartData.getValue())
      {
        cartSubtotal+= currentItem.data.price * currentItem.quantity

      }
      this.cartTotalValue.next(cartSubtotal.toFixed(2))
    }

    updateItemQty(itemId:number, itemQty:any):Observable<any>
    {

      let productData =
      {
        'quantity':itemQty
      }
      return this._HttpClient.post(this.baseURL+`cart/${itemId} `, productData, this.httpOptions)
    }

    clearCartItems():Observable<any>
    {
      return this._HttpClient.delete(this.baseURL+'cart', this.httpOptions)
    }
    removeFromCart(itemId:number):Observable<any>
    {
      return this._HttpClient.delete(this.baseURL+`cart/${itemId}`,this.httpOptions)
    }
}
