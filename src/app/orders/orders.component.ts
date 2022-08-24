import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;

  constructor(private _ordersServices: OrderService) { }


  ngOnInit(): void {
  }
  getAllBooks(): void {
    this._ordersServices.getAllorders()
      .subscribe((orders) => {
          this.orders = orders;
        });
  }
}
