import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = 'http://localhost:8000/api/v1/contact-us';

  constructor(private httpClient: HttpClient) {
  }

  sendEmail(user: User) {
    return this.httpClient.post(this.url, user);
  }
}
