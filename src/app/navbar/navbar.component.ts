import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {TokenStorageService} from '../_services/token-storage.service';
import { zip } from 'rxjs';

declare let $:any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean = false;
  userData:any = {};
  userName:string = '';
  userRole:string = ''
  cartItems:any;
  cartLength:any;
  cartTotal:any;

  dashboard:boolean = true;
  isLoggedIn: any;
  name: any;
  user: any;

  constructor(private _AuthService:AuthService, private TokenStorageService:TokenStorageService , public _Router:Router, private _CartService:CartService, private _ToastrService:ToastrService)
  {
    this.isLoggedIn = this.TokenStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.TokenStorageService.getUser();
      this.name = user?.data?.user.name;
      console.log(this.name);
    }

    this.showCartData()
  }

  logout()
  {
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.TokenStorageService.clean();
    this._Router.navigate(['/login']);
    this._CartService.cartData.next(null) // clear cart data
    this._CartService.cartTotalValue.next('00.0')
    this._CartService.cartItemsLength.next(null)

  }
  showCartData()
  {
    this._CartService.cartData.subscribe((resp:any)=>
    {
      this.cartItems = resp
    })

    this._CartService.cartItemsLength.subscribe((resp:any)=>
    {
      this.cartLength = resp
    })

    this._CartService.cartTotalValue.subscribe((resp:any)=>
    {
      this.cartTotal = resp
    })

  }

  deleteItem(itemId:any)
  {
    this._CartService.removeFromCart(itemId).subscribe((resp)=>
    {
      console.log(resp);
      this._CartService.showCartData();
      this._ToastrService.success(resp.message)


    })
  }

  profile_Dropdwon()
  {
    if($('#profile_menu li').css('opacity') != 0)
    {
      $('#profile_menu li').css('opacity', '0');
      $('.action').animate({bottom:'0px',opacity: '0',height:'0px'}, 'fast');
      $('.action').css('display', 'none');
    }
    else
    {
      $('.action').css({'bottom': '', 'display':'block', 'height':''});
      $('#profile_menu li').css('opacity', '1');
      $('.action').animate({opacity: '1'}, 'fast');
    }
  }

  sideBar()
  {
    $('.fa-bag-shopping').removeClass('fa-bounce');

    if( $("#sideBar").css("right") =="-320px" ) //when sidebar inside
    {
      $(".sideBar_lightbox").css("display", 'block');
      $(".sideBar").css("right", '0px');
    }
    else //when sidebar outside
    {
      $(".sideBar_lightbox").css("display", 'none');
      $(".sideBar").css("right", '-320px');
    }
  }

  closeSideBar()
  {
    $('.fa-bag-shopping').removeClass('fa-bounce');
    $(".sideBar").css("right", '-320px');
    $(".sideBar_lightbox").css("display", 'none');
  }

  ngOnInit(): void {
    $('#menu-bar').click(function()
    {
      var menu:any = document.getElementById("menu");
      if( $("#menu").css("left") =="500px" ) //when sidebar inside
      {
          menu.style.left = "180px"  ;
          $('#menu-bar').addClass('fas fa-times');
      }
      else //when sidebar outside
      {
        menu.style.left = "500px"    ;
        $('#menu-bar').removeClass('fas fa-times');
        $('#menu-bar').addClass('fas fa-bars');
      }
    });


    $('.icon').click(function()
    {
      console.log('hello');

      if( $("#sideBar").css("width") =="0px" ) //when sidebar inside
      {
        $(".sideBar_lightbox").css("display", 'block');
        $(".sideBar").css("width", '320px');
      }
      else //when sidebar outside
      {
        $(".sideBar_lightbox").css("display", 'none');
        $(".sideBar").css("width", '0px');
      }
    });



    // $(".sideBar_lightbox").on('click', closeSideBar);
    // $("#close-bar").on('click', closeSideBar);

  }

}
