import { Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { BooksByUserComponent } from './books/books-by-user/books-by-user.component';

export const appRoutes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book/:volumeId', component: BookDetailComponent },
  {
    path: 'mybooks/:status',
    component: BooksByUserComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
