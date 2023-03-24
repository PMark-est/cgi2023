import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page } from 'src/app/models/page';
import { PageEvent } from '@angular/material/paginator';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

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

  showAddForm: boolean;
  subscription: Subscription;

  constructor(
    private checkoutService: CheckoutService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddForm = val));
  }

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

  toggleAddCheckout(): void {
    this.uiService.toggleAddForm();
  }
}
