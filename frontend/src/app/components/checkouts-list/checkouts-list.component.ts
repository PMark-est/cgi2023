import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page } from 'src/app/models/page';
import { PageEvent } from '@angular/material/paginator';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss'],
})
export class CheckoutsListComponent implements OnInit {
  checkouts: Observable<Page<Checkout>>;
  pageNumber: number = 0;
  pageAmount: number;
  pageSize: number = 1;
  sort: string = 'n';
  direction: string = 'asc';
  pageEvent: PageEvent;
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkouts = this.checkoutService.getCheckouts({});
    this.checkoutService
      .getCheckouts({})
      .subscribe((val) => (this.pageAmount = val.totalPages));
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex;
    this.checkouts = this.checkoutService.getCheckouts({
      pageIndex: this.pageNumber,
    });
  }
}
