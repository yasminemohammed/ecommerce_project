import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL: any = 'http://localhost:8000/api/v1/';
  headers: any;

  cartData: any = new BehaviorSubject([])
  cartItemsLength: any = new BehaviorSubject(0)
  cartTotalValue: any = new BehaviorSubject(0)
  cartSubTotalValue: any = new BehaviorSubject(0);
  cartNewTaxValue: any = new BehaviorSubject(0);
  discount: any = new BehaviorSubject(0);
  cartProductsData: any = new BehaviorSubject([]);

  httpOptions: any;

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders(),
      withCredentials: true
    };
    this.showCartData()
  }

  getCartData(): Observable<any> {
    return this._HttpClient.get(this.baseURL + `cart`, this.httpOptions)
  }

  showCartData() {
      if(this._AuthService.currentUserData.getValue())
      {
        this.getCartData().subscribe((resp)=> {
          console.log(resp, 'here');
          if (resp.data.items) {
            this.cartData.next(resp.data.items);
            this.cartProductsData.next(resp.data.products);
            this.cartItemsLength.next(resp.data.items.length);
            this.cartSubTotalValue.next(resp.data.newSubtotal);
            this.cartNewTaxValue.next(resp.data.newTax);
            this.discount.next(resp.data.discount);
            this.cartTotalValue.next(resp.data.newTotal.toFixed(2))
          } else {
            this.cartData.next([]);
            this.cartProductsData.next([]);
            this.cartItemsLength.next(0);
            this.cartSubTotalValue.next(0);
            this.cartNewTaxValue.next(0);
            this.discount.next(0);
            this.cartTotalValue.next(0)
          }
        }, (error) => {
          console.log(error);
        })
      }

    }

    addToCart(id:any):Observable<any>
    {
      $('.fa-bag-shopping').addClass('fa-bounce');

      let productData =
      {
        'id':id
      }
      return this._HttpClient.post(this.baseURL + `cart`, productData, this.httpOptions)
    }

    getCartTotal()
    {
      let cartSubtotal = 0;

      for (let currentItem of this.cartData.getValue())
      {
        cartSubtotal += currentItem.price * currentItem.qty
        // console.log(currentItem);


      }
      this.cartSubTotalValue.next(cartSubtotal.toFixed(2))
    }

    updateItemQty(itemId:number, itemQty:any):Observable<any>
    {

      let productData =
      {
        'quantity':itemQty
      }
      return this._HttpClient.patch(this.baseURL + `cart/${itemId} `, productData, this.httpOptions)
    }

  clearCartItems(): Observable<any> {
    return this._HttpClient.delete(this.baseURL + `cart`, this.httpOptions)
  }

  removeFromCart(itemId: number): Observable<any> {
    return this._HttpClient.delete(this.baseURL + `cart/${itemId}`, this.httpOptions)
  }

  applyCoupon(code: any): Observable<any> {
    let body =
      {
        'couponCode': code
      }
    return this._HttpClient.post(`${environment.base_url}/coupons`, body, this.httpOptions)
  }
}
