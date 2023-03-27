import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { CheckoutsListComponent } from './components/checkouts-list/checkouts-list.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';
import { AddCheckoutDialog } from './components/add-checkout-dialog/add-checkout-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AddBookDialogComponent } from './components/add-book-dialog/add-book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CheckoutsListComponent,
    CheckoutDetailComponent,
    AddCheckoutDialog,
    DeleteDialogComponent,
    AddBookDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
