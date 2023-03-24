import { Component } from '@angular/core';

@Component({
  selector: 'app-add-checkout',
  templateUrl: './add-checkout.component.html',
  styleUrls: ['./add-checkout.component.scss'],
})
export class AddCheckoutComponent {
  id: string;
  borrowerFirstName: string;
  borrowerLastName: string;
  borrowedBook: string;
  checkedOutDate: number;
  dueDate: number;
  returnedDate: number;

  onClick(): void {
    if (
      !(
        this.id &&
        this.borrowerFirstName &&
        this.borrowerLastName &&
        this.borrowedBook
      )
    ) {
      alert('Kohustuslikud väljad on puudu');
    }
  }
}
