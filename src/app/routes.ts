import { Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

export const appRoutes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
