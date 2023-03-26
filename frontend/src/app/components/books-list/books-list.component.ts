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
  books$!: Observable<Page<Book>>;
  currentPage: number = 0;
  pageAmount: number;
  pageSize: number = 20;
  sort: string = 'n';
  direction: string = 'asc';
  pageEvent: PageEvent;

  searchTerm: string;
  showAddForm: boolean;
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    router.events.subscribe((event) => console.log(event));
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddForm = val));
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.activatedRoute.queryParams.subscribe(
      (val) => (this.currentPage = val['page'])
    );
    this.books$ = this.bookService.getBooks({ pageIndex: this.currentPage });
    this.books$.subscribe((val) => (this.pageAmount = val.totalElements));
  }
  handlePageEvent(pageEvent: PageEvent) {
    //localStorage.setItem('favorites', JSON.stringify(['book', 'book2']));
    //JSON.parse(localStorage.getItem('favorites') || '');
    this.currentPage = pageEvent.pageIndex;
    this.router.navigate(['/books'], {
      queryParams: { page: this.currentPage },
    });
    this.books$ = this.bookService.getBooks({ pageIndex: this.currentPage });
  }
  toggleAddBooks(): void {
    this.uiService.toggleAddForm();
  }

  search(): void {
    this.books$ = this.bookService.getBooks({ term: this.searchTerm });
    this.router.navigate(['/books'], {
      queryParams: { search: this.searchTerm },
    });
  }
}
