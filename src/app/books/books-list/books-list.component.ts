import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/_services/books.service';
import { Book } from '../../_models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: Book[] = new Array();
  searchValue: string;
  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService
      .getBooksForHomeScreen()
      .then((res) => {
        this.books = this._convertResponseToBooksArray(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchBooks() {
    this.booksService
      .getBooksBySearch(this.searchValue)
      .then((res) => {
        this.books = this._convertResponseToBooksArray(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private _convertResponseToBooksArray(res): Book[] {
    const books: Book[] = new Array();
    res.forEach((element) => {
      const book: Book = new Book();
      book.volumeId = element.id;
      if (element.volumeInfo) {
        if (element.volumeInfo.title) {
          book.title = element.volumeInfo.title;
        }
        if (element.volumeInfo.authors) {
          book.author = element.volumeInfo.authors[0];
        }
        if (element.volumeInfo.imageLinks.smallThumbnail) {
          book.img = element.volumeInfo.imageLinks.smallThumbnail;
        }
        if (element.volumeInfo.publishedDate) {
          book.publishedDate = element.volumeInfo.publishedDate;
        }
        if (element.volumeInfo.description) {
          book.description = element.volumeInfo.description;
        }
        if (element.volumeInfo.pageCount) {
          element.pages = element.volumeInfo.pageCount;
        }
      }

      books.push(book);
    });

    return books;
  }
}
