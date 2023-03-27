import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AddCheckoutDialog } from '../add-checkout-dialog/add-checkout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  bookStatus: string;
  isDisabled: boolean;
  @Input() activeColor: string = '#c84566';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map((params) => params['id']))
      .pipe(switchMap((id) => this.bookService.getBook(id)));
    var self = this;
    this.book$.subscribe(function (val) {
      if (val['status'] !== 'AVAILABLE') {
        self.isDisabled = true;
        self.activeColor = '#c2c2c2';
      }
    });
  }
  onCheckout(book: Book): void {
    this.dialog.open(AddCheckoutDialog, { data: book });
  }
}
