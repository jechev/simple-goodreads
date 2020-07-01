import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { BooksByUserComponent } from './books/books-by-user/books-by-user.component';
import { BooksListComponent } from './books/books-list/books-list.component';

import { BooksService } from './_services/books.service';
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';

import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BooksListComponent,
    BookDetailComponent,
    RegisterComponent,
    BooksByUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [BooksService, UserService, AlertifyService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
