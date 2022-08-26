import { Component, OnInit } from '@angular/core';
import {user} from '../classes/user';
import {ContactService} from '../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  isSuccessful = false;
  user: user = new user();
  data: any;
  email: string | undefined;
  result: any;
  constructor(private toastr: ToastrService,private contactService: ContactService , private http:HttpClient) { }

  ngOnInit(): void{

  }
  sendEmail(name: string, email: string, phoneNo: number, subject: string, message: string)
  {
    this.user.name = name;
    this.user.email = email;
    this.user.phoneNo = phoneNo;
    this.user.subject = subject;
    this.user.message = message;
    this.isSuccessful = true;
    this.contactService.sendEmail(this.user).subscribe( data => {this.data = data; });
    if(Response)
    {
      console.log("We will contact you soon , thank you");
      this.toastr.success("We will contact you soon , thank you");
    }
    else{
      console.log("noooooooooo");
    }
  }



}



