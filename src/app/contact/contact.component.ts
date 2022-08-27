import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isSuccessful = false;
  user: User = new User();
  data: any;
  email: string | undefined;
  result: any;

  constructor(private toastr: ToastrService, private contactService: ContactService, private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  sendEmail(name: string, email: string, phoneNo: number, subject: string, message: string) {
    this.user.name = name;
    this.user.email = email;
    this.user.phoneNo = phoneNo;
    this.user.subject = subject;
    this.user.message = message;
    this.isSuccessful = true;
    this.contactService.sendEmail(this.user).subscribe(data => {
      this.data = data;
    });
    if (Response) {
      console.log("We will contact you soon , thank you");
      this.toastr.success("We will contact you soon , thank you");
    } else {
      console.log("noooooooooo");
    }
  }

}
