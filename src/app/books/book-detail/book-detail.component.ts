import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../_services/books.service';
import { BookDetails } from 'src/app/_models/bookDetails';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  book: BookDetails;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BooksService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookService
      .getBookById(bookId)
      .then((res) => {
        this.book = new BookDetails();
        if (res.data.volumeInfo) {
          if (res.data.volumeInfo.title) {
            this.book.title = res.data.volumeInfo.title;
          }
          if (res.data.volumeInfo.authors) {
            this.book.author = res.data.volumeInfo.authors[0];
          }
          if (res.data.volumeInfo.imageLinks.medium) {
            this.book.img = res.data.volumeInfo.imageLinks.medium;
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
