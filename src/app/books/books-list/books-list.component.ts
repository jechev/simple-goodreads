import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/_services/books.service';
import { Book } from '../../_models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  page = 1;
  totalItems: number;
  books: Book[] = new Array();
  searchValue: string;
  genre = 'thriller';
  genres: string[] = [
    'Fantasy',
    'Science fiction',
    'Western',
    'Romance',
    'Thriller',
    'Mystery',
    'Detective story',
    'Dystopia',
    'Memoir',
    'Biography',
    'Play',
    'Musical',
    'Satire',
    'Haiku',
    'Horror',
    'DIY (Do It Yourself)',
    'Dictionary',
  ];
  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService
      .getBooksByGenre(this.genre, (this.page - 1) * 10)
      .then((res) => {
        this.totalItems = Number(res.data.totalItems);
        console.log(this.totalItems);
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
        this.totalItems = Number(res.data.totalItems);
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
        if (
          element.volumeInfo.imageLinks &&
          element.volumeInfo.imageLinks.smallThumbnail
        ) {
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

  pageChanged(event: any) {
    this.page = event.page;
    this.loadBooks();
  }
}
