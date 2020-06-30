import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/_services/books.service';
import { BookForUser } from 'src/app/_models/bookForUserList';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-books-by-user',
  templateUrl: './books-by-user.component.html',
  styleUrls: ['./books-by-user.component.scss'],
})
export class BooksByUserComponent implements OnInit {
  books: BookForUser[];
  status: string;
  header: string;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.takeBooksFromDB();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck() {
    this.takeBooksFromDB();
  }

  changeToRead(book: BookForUser) {
    book.read = true;
    book.wantToRead = false;
    this.booksService
      .editBook(book.id, book)
      .then((res) => {
        console.log('Done');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeToWantToRead(book: BookForUser) {
    book.wantToRead = true;
    book.read = false;
    this.booksService
      .editBook(book.id, book)
      .then((res) => {
        console.log('Done');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeBookToOtherStatus(status: string, book: BookForUser) {
    if (status === 'read') {
      book.read = true;
      book.wantToRead = false;
    } else {
      book.wantToRead = true;
      book.read = false;
    }
    this.booksService
      .editBook(book.id, book)
      .then((res) => {
        // tslint:disable-next-line: quotemark
        this.alertifyService.success("You book's status");
        this.removeBookFromArray(book.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  takeBooksFromDB() {
    if (this.route.snapshot.paramMap.get('status') !== this.status) {
      this.books = new Array();
      this.status = this.route.snapshot.paramMap.get('status');
      if (this.status === 'read') {
        this.header = 'Read';
      } else {
        this.header = 'Want to Read';
      }
      const userId = Number(sessionStorage.getItem('userId'));
      this.booksService
        .getBooksForUserAndStatus(userId, this.status)
        .then((res) => {
          res.data.forEach((element) => {
            const book = element as BookForUser;
            this.books.push(book);
          });
        });
    }
  }

  removeBookFromArray(id) {
    this.books.splice(
      this.books.findIndex((el) => {
        return el.id === id;
      }),
      1
    );
  }
}
