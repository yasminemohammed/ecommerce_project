import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckoutService} from "../services/checkout.service";
import {environment} from "../../environments/environment";

declare let $: any;
declare let Stripe: any;
declare let createToken: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: any[] = [];
  cartProducts: any[] = [];
  cartSubTotal: number = 0
  cartTotal: number = 0
  cartTax: number = 0
  cartDiscount: number = 0
  itemTotal: number = 0
  item: any;

  stripe: any;

  card: any;
  displayErrors: string[] = [];
  user_token: string = '';
  fileImg: any = null;
  isError: boolean = false;
  registerForm: FormGroup = this.formBuilder.group({

    email: new FormControl(null, [Validators.required, Validators.email]),
    nameOnCard: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("^((\\01-?)|0)?[0-9]{11}$")]),
    name: new FormControl(null, [Validators.required]),
    province: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
  });

  constructor(private _CartService: CartService, private checkoutService: CheckoutService, private _Router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {
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

  submitForm(registerForm: any) {
    let userData = registerForm.value
    let formData = new FormData();

    this.stripe.createToken(this.card).then((result: any) => {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement: any = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        // stripeTokenHandler(result.token);
        console.log(result.token.id)
        formData.append('stripeToken', result.token.id);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('name', userData.name);
        formData.append('nameOnCard', userData.nameOnCard);
        formData.append('city', userData.city);
        formData.append('province', userData.province);
        formData.append('address', userData.address);
        formData.append('postalCode', userData.postalCode);

        this.checkoutService.checkout(formData).subscribe(
          (response: any) => {
            if (response?.success) {
              this._CartService.showCartData();
              this.displayErrors = [];
              this.isError = false;
              this._Router.navigate(['/shop']);
              this.toastr.success(response.message);
            }
          },
          (errors) => {
            console.log(errors);
            this.isError = true;

            let errorsArray = errors.error.errors;
            this.displayErrors = [];
            for (var property in errorsArray) {
              this.displayErrors.push(errorsArray[property][0]);
            }
          })
      }
    });


  }

  ngOnInit(): void {
    this.stripe = Stripe(environment.stripe_key);

    let elements = this.stripe.elements();
    let style = {
      base: {
        color: "#32325d",
      }
    };

    // let card = elements.create("card", { style: style });
    this.card = elements.create('card', {hidePostalCode: true, style: style});

    this.card.mount("#card-element");

    this.card.on('change', function (event: any) {
      let displayError = document.getElementById('card-errors');
      if (event.error && displayError !== null) {
        displayError.textContent = event.error.message;
      } else if (displayError !== null) {
        displayError.textContent = '';
      }
    });


    $(document).ready(function () {

      var current_fs: any, next_fs: any, previous_fs: any; //fieldsets
      var opacity: any;
      // setProgressBar(current);

      $(".next").click(function () {

        current_fs = $(event!.target).parent();
        next_fs = $(event!.target).parent().next();
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function (now: any) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              'display': 'none',
              'position': 'relative'
            });
            next_fs.css({'opacity': opacity});
          },
          duration: 300
        });
        // setProgressBar(++current);
      });

      $(".previous").click(function () {

        current_fs = $(event!.target).parent();
        previous_fs = $(event!.target).parent().prev();


        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function (now: any) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              'display': 'none',
              'position': 'relative'
            });
            previous_fs.css({'opacity': opacity});
          },
          duration: 300
        });
      });


    });
  }


}
