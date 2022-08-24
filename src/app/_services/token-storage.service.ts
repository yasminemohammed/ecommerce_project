import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const token = JSON.parse(localStorage.getItem('auth-user') || '{}');
const USER_TOKEN = 'auth-token';
console.log(token);


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();

  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    const users = token.data.accessToken;
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.setItem(USER_TOKEN , users );
    window.localStorage.removeItem(USER_TOKEN);
    window.localStorage.setItem(USER_TOKEN, users);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    const token = window.sessionStorage.getItem(USER_TOKEN);

    if (user) {
      console.log(token);
      return true;
    }

    return false;
  }
}
