import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {CartService} from './../services/cart.service';



@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
  orderId:number = 0;

    orders: any;
  cartTotal: any;

    constructor(private _CartService: CartService,private _ordersServices: OrderService,private _ActivatedRoute:ActivatedRoute,) {
      this.orderId = _ActivatedRoute.snapshot.params.orderId;
      this.getOrder();
      this._CartService.cartTotalValue.subscribe((resp: any) => {
        this.cartTotal = resp;
      })
    }


    ngOnInit(): void {
      this.getOrder();
    }

   

    getOrder(): void {
      this._ordersServices.getOrder(this.orderId).subscribe((resp:any)=>
    {
      this.orders = resp.data;
      console.log(this.orders)
    })
    }
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 600,

      navText: ['<i class="fa-solid fa-caret-left"></i>', '<i class="fa-solid fa-caret-right"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        760: {
          items: 3
        },
        1000: {
          items: 4
        }
      },
      nav: true,
    }
  }






