import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: Observable<Page<Book>>;
  pageNumber: number = 0;
  pageAmount: number;
  pageSize: number = 1;
  sort: string = 'n';
  direction: string = 'asc';
  pageEvent: PageEvent;
  page: number;

  showAddForm: boolean;
  subscription: Subscription;

  constructor(private bookService: BookService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddForm = val));
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books = this.bookService.getBooks({});
    this.books.subscribe((val) => (this.pageAmount = val.totalPages));
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex;
    this.page = pageEvent.pageIndex;
    this.books = this.bookService.getBooks({ pageIndex: this.pageNumber });
    // TODO: QUERYPARAMS!!!
    //this.route.queryParams.subscribe((val) => console.log(val));
  }
  toggleAddBooks(): void {
    this.uiService.toggleAddForm();
  }
}
