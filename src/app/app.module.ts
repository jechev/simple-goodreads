import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BooksService } from './_services/books.service';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

@NgModule({
  declarations: [AppComponent, BooksListComponent, BookDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [BooksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
