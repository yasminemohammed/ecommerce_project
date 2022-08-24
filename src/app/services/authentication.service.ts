import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(email: string, password: number) {
    return this.httpClient.post<any>('http://localhost:8000/api/v1/login', {email, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('email');
  }
}
