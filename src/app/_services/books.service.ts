import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = 'https://www.googleapis.com/books/v1';
  constructor() {}

  public getBooksForHomeScreen() {
    return axios.get(`${this.baseUrl}/volumes?q=dz&projection=lite`);
  }

  public getBooksBySearch(searchValue) {
    return axios.get(
      `${this.baseUrl}/volumes?q=${searchValue}&projection=lite`
    );
  }
}
