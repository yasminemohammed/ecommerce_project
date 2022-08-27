import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  dashboard: boolean = true;
  products: any;

  constructor(private _ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._ProductsService.getAllProducts().subscribe((resp) => {
        this.products = resp.data;
        console.log(this.products)
      },
      (errors) => {
        console.log(errors);

      })
  }

}
