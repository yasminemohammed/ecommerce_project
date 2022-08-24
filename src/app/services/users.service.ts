import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class usersService {

  private baseUrl = 'http://localhost:8000/api/v1/register';

  constructor(private httpClient: HttpClient) {
  }

  getCustomer(userName: string): Observable<any> {
    return this.httpClient.get('http://localhost:8000/api/v1/user');
  }

  registerCustomer(users: Object): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, users);
  }


}
