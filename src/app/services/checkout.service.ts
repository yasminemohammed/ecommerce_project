import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders(),
      withCredentials: true
    }
  }

  checkout(formData: FormData) {

    return this.httpClient.post(`${environment.base_url}/checkout`, formData, this.httpOptions);
  }
}
