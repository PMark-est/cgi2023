import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent {
  @Input() title: string;
  @Input() author: string;
  @Input() year: string;
  @Input() genre: string;
  @Input() comment: string;
  error: boolean;
  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<AddBookDialogComponent>
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
  onAdd(): void {
    if (!(this.title && this.author && this.year && this.genre)) {
      this.error = true;
      return;
    }
    var currentDate = new Date();
    var newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    currentDate.setMonth(currentDate.getMonth() - 1);
    var book: Book = {
      id: uuid.v4(),
      title: this.title,
      author: this.author,
      genre: this.genre,
      year: +this.year,
      added: currentDate.toISOString(),
      checkOutCount: 0,
      status: 'AVAILABLE',
      dueDate: newDate.toISOString(),
      comment: this.comment,
    };
    this.bookService.saveBook(book).subscribe(() => location.reload());
    this.dialogRef.close();
  }
}
