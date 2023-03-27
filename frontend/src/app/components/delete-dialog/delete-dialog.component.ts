import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BooksListComponent } from '../books-list/books-list.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<BooksListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.bookService
      .deleteBook(this.data.id)
      .subscribe(() => location.reload());
    this.dialogRef.close();
  }
}
