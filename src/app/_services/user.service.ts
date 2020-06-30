import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export class UserService {
  private baseUrl = 'http://localhost:3000/';
  constructor() {}

  public login(email, password) {
    return axios.post(this.baseUrl + 'login', {
      email,
      password,
    });
  }

  public register(email, password) {
    return axios.post(this.baseUrl + 'register', {
      email,
      password,
      books: [],
    });
  }

  public getAllUsers() {
    return axios.get(this.baseUrl + 'users');
  }

  public saveToken(res) {
    sessionStorage.setItem('accessToken', res.data.accessToken);
    sessionStorage.setItem('email', JSON.parse(res.config.data).email);
  }

  public isAuth(): boolean {
    return sessionStorage.getItem('accessToken') !== null;
  }

  public logout() {
    sessionStorage.clear();
  }

  public getUserDetails(email?) {
    // If email miss like arg, than it's return info for current user
    if (email === undefined) {
      email = sessionStorage.getItem('email');
    }
    return axios.get(this.baseUrl + 'users/?email=' + email);
  }
}
