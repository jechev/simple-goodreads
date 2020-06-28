import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = 'https://www.googleapis.com/books/v1';
  constructor() {}

  public getBooksForHomeScreen() {
    return axios.get(
      `${this.baseUrl}/volumes?q=subject:thriller&projection=lite`
    );
  }

  public getBooksBySearch(searchValue) {
    return axios.get(
      `${this.baseUrl}/volumes?q=${searchValue}&projection=lite`
    );
  }

  public getBookById(id) {
    return axios.get(`${this.baseUrl}/volumes/${id}`);
  }
}
