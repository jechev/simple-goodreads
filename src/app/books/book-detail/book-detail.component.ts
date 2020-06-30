import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../_services/books.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Book } from 'src/app/_models/book';
import { BookForUser } from 'src/app/_models/bookForUserList';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book;
  isUsedBook: boolean;
  userId: number;
  canLoaded: boolean;
  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('volumeId');
    this.bookService
      .getBookById(bookId)
      .then((res) => {
        this.book = new Book();
        this.book.volumeId = res.data.id;
        if (res.data.volumeInfo) {
          if (res.data.volumeInfo.title) {
            this.book.title = res.data.volumeInfo.title;
          }
          if (res.data.volumeInfo.authors) {
            this.book.author = res.data.volumeInfo.authors[0];
          }
          if (res.data.volumeInfo.imageLinks.smallThumbnail) {
            this.book.img = res.data.volumeInfo.imageLinks.smallThumbnail;
          }
          if (res.data.volumeInfo.publishedDate) {
            this.book.publishedDate = res.data.volumeInfo.publishedDate;
          }
          if (res.data.volumeInfo.description) {
            this.book.description = res.data.volumeInfo.description;
          }
          if (res.data.volumeInfo.pageCount) {
            this.book.pages = res.data.volumeInfo.pageCount;
          }
        }
        if (this.loggedIn()) {
          this.userId = Number(sessionStorage.getItem('userId'));
          // tslint:disable-next-line: no-shadowed-variable
          this.bookService.getBooksForUser(this.userId).then((res) => {
            const index = res.data.findIndex((el) => {
              return el.volumeId === this.book.volumeId;
            });
            if (index >= 0) {
              this.isUsedBook = true;
            } else {
              this.isUsedBook = false;
            }
            this.canLoaded = true;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addBookForRead() {
    const bookForAdd: BookForUser = this._convertBookToBookForUser();
    bookForAdd.read = true;
    this.bookService.addBookInUserList(bookForAdd).then((res) => {
      this.alertifyService.success('You added new book in Read List');
    });
  }

  addBookForWantToRead() {
    const bookForAdd: BookForUser = this._convertBookToBookForUser();
    bookForAdd.wantToRead = true;
    this.bookService.addBookInUserList(bookForAdd).then((res) => {
      this.alertifyService.success('You added new book in Want to Read List');
    });
  }

  loggedIn(): boolean {
    return this.userService.isAuth();
  }

  private _convertBookToBookForUser(): BookForUser {
    const newBookForAdd: BookForUser = new BookForUser();
    Object.assign(newBookForAdd, this.book);
    newBookForAdd.read = false;
    newBookForAdd.wantToRead = false;
    newBookForAdd.userId = this.userId;
    return newBookForAdd;
  }
}
