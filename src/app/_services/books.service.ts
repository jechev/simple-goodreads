import { Injectable } from '@angular/core';
import axios from 'axios';
import { BookForUser } from '../_models/bookForUserList';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = 'https://www.googleapis.com/books/v1';
  private dbUrl = 'http://localhost:3000';
  constructor() {}

  public getBooksByGenre(genre, startIndex) {
    return axios.get(
      `${this.baseUrl}/volumes?q=subject:${genre}&startIndex=${startIndex}&projection=lite`
    );
  }

  public getBooksBySearch(searchValue) {
    return axios.get(
      `${this.baseUrl}/volumes?q=${searchValue}&projection=lite`
    );
  }

  public editBook(id, book) {
    return axios.put(`${this.dbUrl}/books/${id}`, book);
  }

  public getBookById(id) {
    return axios.get(`${this.baseUrl}/volumes/${id}`);
  }

  public addBookInUserList(book: BookForUser) {
    return axios.post(`${this.dbUrl}/books`, book);
  }

  public getBooksForUserAndStatus(userId, status) {
    return axios.get(`${this.dbUrl}/users/${userId}/books?${status}=true`);
  }

  public getBooksForUser(userId) {
    return axios.get(`${this.dbUrl}/users/${userId}/books`);
  }
}
