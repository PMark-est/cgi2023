import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books$!: Observable<Page<Book>>;
  pageNumber: number = 0;
  pageAmount: number;
  pageSize: number = 1;
  sort: string = 'n';
  direction: string = 'asc';
  pageEvent: PageEvent;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({});
    console.log(this.pageNumber);
    this.bookService
      .getBooks({})
      .subscribe((val) => (this.pageAmount = val.totalPages));
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex;
    this.books$ = this.bookService.getBooks({ pageIndex: this.pageNumber });
    console.log(this.pageNumber);
  }
}
