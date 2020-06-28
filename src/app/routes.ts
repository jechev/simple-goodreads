import { Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list/books-list.component';

export const appRoutes: Routes = [
  { path: '', component: BooksListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
