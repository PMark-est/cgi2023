import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page, PageRequest } from '../../models/page';
import { Book } from '../../models/book';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books$!: Observable<Page<Book>>;
  status: string = 'AVAILABLE';

  currentPage: number = 0;
  pageAmount: number;
  pageSize: number = 20;
  sort: string = 'n';
  direction: string = 'asc';
  pageEvent: PageEvent;
  searchTerm: string;
  showAddForm: boolean;

  constructor(
    private bookService: BookService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.activatedRoute.queryParams.subscribe((val) => {
      this.currentPage = val['page'];
    });
    this.fetchBooks({ pageIndex: this.currentPage });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.router.navigate(['/books'], {
      queryParams: { page: this.currentPage },
    });
    this.books$ = this.bookService.getBooks({
      pageIndex: this.currentPage,
      status: this.status,
    });
  }

  fetchBooks(filter?: Partial<PageRequest>): void {
    this.books$ = this.bookService.getBooks({ ...filter, status: this.status });
    this.books$.subscribe((val) => (this.pageAmount = val.totalElements));
  }

  search(): void {
    this.fetchBooks({ term: this.searchTerm });
    this.router.navigate(['/books'], {
      queryParams: { search: this.searchTerm },
    });
  }

  onDelete(e: Event, book: Book): void {
    e.stopPropagation();
    e.preventDefault();
    this.dialog.open(DeleteDialogComponent, { data: book });
  }

  addBook(): void {
    this.dialog.open(AddBookDialogComponent, {});
  }

  onStatusChange(status: MatSelectChange): void {
    this.currentPage = 0;
    this.router.navigate(['/books'], {
      queryParams: { page: undefined },
    });
    this.fetchBooks();
  }
}
