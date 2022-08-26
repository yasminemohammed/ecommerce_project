import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../services/orders.service';
import {Router} from '@angular/router';
import {CartService} from '../services/cart.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const api = 'http://localhost:8000/api/v1/';
const token = window.localStorage.getItem('auth-token');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json' ,'Authorization':`Bearer  ${token}`})
};
declare var Stripe:any ;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  user = window.localStorage.getItem('auth-user');

  myForm!: FormGroup;
  username!: string;
  stripe:any;


  constructor(private toastr: ToastrService,private orderService: OrderService, private formBuilder: FormBuilder,
              private router: Router, private cartService: CartService,private http: HttpClient) {
  }
  ngOnInit() {

    const emailRegex ='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    const numberRegEx = /\-?\d*\.?\d{1,2}/;

    this.myForm = this.formBuilder.group({
//emaillllll
      email: [null, [Validators.required, Validators.email,Validators.pattern(emailRegex),
       Validators.maxLength(25),Validators.minLength(10)]],updateOn: "blur",
//nameeeeee
      name: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]*')]],
//address
      address: [null, [Validators.required ,Validators.minLength(10),
        Validators.maxLength(50),Validators.pattern('[-_a-zA-Z0-9-,]*')]],
//city
      city: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z ]*')]],
//province
  province: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z ]*')]],
//postalcodeeeeee

      postalCode: [null, [Validators.required,Validators.pattern(numberRegEx)]],

//phone
      phone: [null,[ Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(11), Validators.maxLength(11)]],
//nameONcard
      nameOnCard: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]*')]],
    });
  }

  onSubmit() {
    this.toastr.success("done successfully");
    this.router.navigate(['/orders']);

  }


  checkout(stripe:any,email:string,name:string,address:any,city:string,province:string,postalCode:number,phone:number,nameOnCard:string):Observable<any>
  {
    var stripe = Stripe('pk_test_51LajDUAoZRK35eGJq3tBgXb11dZlKtNfJpCWib5Op1KnzT7QCl9yJi60Bpg9DNVPzS0cHnQRfnU1vvSfxqfOJ6s2007rU6Oboa');
    return this.http.post(api + 'checkout', {
      stripe,
      email,
      name,
      address,
      city,
      province,
      postalCode,
      phone,
      nameOnCard
      }, httpOptions);

  }


}
