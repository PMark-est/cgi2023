import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { Checkout } from 'src/app/models/checkout';
import { BookService } from 'src/app/services/book.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-checkout-dialog',
  templateUrl: './add-checkout-dialog.component.html',
  styleUrls: ['./add-checkout-dialog.component.scss'],
})
export class AddCheckoutDialog {
  @Input() activeColor: string;
  @Input() activeBorder: string;
  @Input() firstName: string;
  @Input() lastName: string;
  checkoutMessage: string = 'Laenuta';
  error: boolean;
  private active: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddCheckoutDialog>,
    private checkoutService: CheckoutService,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (!(this.firstName && this.lastName)) {
      this.error = true;
      return;
    }
    const currentDate = new Date();
    const dueDate = new Date(
      new Date().setMonth((currentDate.getMonth() + 1) % 11)
    );
    this.error = false;
    if (this.active) {
      this.bookService
        .saveBook({
          ...this.data,
          checkOutCount: this.data.checkOutCount + 1,
          status: 'BORROWED',
          dueDate: dueDate.toISOString(),
        })
        .subscribe();
      const checkout: Checkout = {
        id: uuid.v4(),
        borrowerFirstName: this.firstName,
        borrowerLastName: this.lastName,
        borrowedBook: this.data,
        checkedOutDate: currentDate.toISOString(),
        dueDate: dueDate.toISOString(),
      };
      this.checkoutService.saveCheckout(checkout).subscribe();
      this.dialogRef.close();
    }
    this.active = true;
    this.activeColor = '#3ab53a';
    this.activeBorder = 'solid 2px #000';
    this.checkoutMessage = 'Kinnitan';
  }
}
