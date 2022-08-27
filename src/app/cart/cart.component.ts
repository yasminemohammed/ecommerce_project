import {CartService} from './../services/cart.service';
import {Component, Injectable, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartData: any[] = [];
  cartProducts: any[] = [];
  cartSubTotal: number = 0
  cartTotal: number = 0
  cartTax: number = 0
  cartDiscount: number = 0
  itemTotal: number = 0
  item: any;

  couponApplied: boolean = false;

  constructor(private _CartService: CartService, private _ToastrService: ToastrService) {

    this.showCartData()
  }

  showCartData() {
    this._CartService.cartData.subscribe((resp: any) => {
      this.cartData = resp;
    })
    this._CartService.cartProductsData.subscribe((resp: any) => {
      this.cartProducts = resp;
    })
    this._CartService.cartSubTotalValue.subscribe((resp: any) => {
      this.cartSubTotal = resp;
    })
    this._CartService.cartTotalValue.subscribe((resp: any) => {
      this.cartTotal = resp;
    })
    this._CartService.cartNewTaxValue.subscribe((resp: any) => {
      this.cartTax = resp;
    })
    this._CartService.discount.subscribe((resp: any) => {
      this.cartDiscount = resp;
    })
  }

  increase(itemId:any) {

    this.item = this.cartData.find((product) => product.rowId == itemId);
    if (this.item.qty < 5) {
      this.item.qty++;
      this.itemTotal = this.item.qty * this.item.price
      this.updateProductQty(itemId)
      this._CartService.showCartData()
      $(`#remove_icon_${itemId}`).removeClass('fa-beat');
    }

  }

  decrease(itemId: any) {
    this.item = this.cartData.find((product) => product.rowId == itemId);
    if (this.item.qty <= 1) {
      this.item.qty = 1
      $(`#remove_icon_${itemId}`).addClass('fa-beat');
    } else {
      this.item.qty--;
      this.updateProductQty(itemId)
      this._CartService.showCartData()
      $(`#remove_icon_${itemId}`).removeClass('fa-beat');
    }

  }

  updateProductQty(itemId:number)
  {
    this._CartService.updateItemQty(itemId, this.item.qty).subscribe((resp) => {
      this._ToastrService.success(resp.message)

    })

  }
  removeItem(itemId:number)
  {
    this._CartService.removeFromCart(itemId).subscribe((resp)=>
    {
      console.log(resp);
      this._CartService.showCartData();

    })
  }

  ClearCartItems()
  {
    this._CartService.clearCartItems().subscribe(resp=> {
      this._ToastrService.success('Cart items deleted successfully.')
      this._CartService.showCartData();

    })
  }

  ngOnInit(): void {
  }

  applyCoupon(couponValue: any) {
    this._CartService.applyCoupon(couponValue.value).subscribe(resp => {
        this.couponApplied = true;
        this._ToastrService.success(resp.message)
        this._CartService.showCartData();
      },
      resp => {
        console.log(resp)
        if (resp.status == 404)
          this._ToastrService.error(resp.error.message)
        else if (resp.status == 422)
          this._ToastrService.error(resp.error.errors.couponCode)
      })
  }
}
