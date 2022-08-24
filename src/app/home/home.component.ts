import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
// import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import {SliderService} from '../services/slider.service';
import {CategoriesService} from '../services/categories.service';


declare let $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showProducts:any;
  showSliders:any;
  showCat:any;

  constructor(private _ProductsService:ProductsService
    , private _SliderService:SliderService
    , private _CategoriesService:CategoriesService
    , private _CartService:CartService, private _ToastrService:ToastrService)
  {
    this.showAllProducts();
    this.showAllSliders();
    this.showAllCategories();
   }
  ngOnInit(): void {
  }


  showAllProducts()
  {
    this._ProductsService.getAllProducts().subscribe((resp)=>
    {
      this.showProducts = resp.data;
      console.log(resp.data);

    })
  }

  showAllCategories()
  {
    this._CategoriesService.getAllCategories().subscribe((resp)=>
    {
      this.showCat = resp.data;
      console.log(resp.data);

    })
  }

  showAllSliders()
  {
    this._SliderService.getAllSliders().subscribe((resp)=>
    {
      this.showSliders = resp.data;
      // console.log(resp.data);

    })
  }


  addItemToCart(itemId:number)
  {
    this._CartService.addToCart(itemId).subscribe((resp)=>
    {
      console.log(resp);
      this._CartService.showCartData()
      this._ToastrService.success(resp.item.product.name + ' Added successfully!')
    },
    (errors)=>
    {
      console.log(errors);

      this._ToastrService.info(errors.error.message)
      $(".sideBar_lightbox").css("display", 'block');
      $(".sideBar").css("right", '0px');


    })
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    autoplay:true,

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
