import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page } from 'src/app/models/page';
import { PageEvent } from '@angular/material/paginator';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss'],
})
export class CheckoutsListComponent implements OnInit {
  checkouts$!: Observable<Page<Checkout>>;
  currentPage: number = 0;
  pageAmount: number;
  pageSize: number = 20;
  sort: string = 'n';
  direction: string = 'asc';
  pageEvent: PageEvent;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (val) => (this.currentPage = val['page'])
    );
    this.checkouts$ = this.checkoutService.getCheckouts({
      pageIndex: this.currentPage,
    });
    this.checkouts$.subscribe((val) => (this.pageAmount = val.totalElements));
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.checkouts$ = this.checkoutService.getCheckouts({
      pageIndex: this.currentPage,
    });
    this.currentPage = pageEvent.pageIndex;
    this.router.navigate(['/checkouts'], {
      queryParams: { page: this.currentPage },
    });
    console.log(this.currentPage);
    this.checkouts$ = this.checkoutService.getCheckouts({
      pageIndex: this.currentPage,
    });
  }
}
