import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Observable, Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../models/book';
import { BookStatus } from 'src/app/models/book-status';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  showAddForm: boolean;
  subscription: Subscription;
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  added: string;
  checkOutCount: string;
  dueDate: string;
  comment: string;
  private book: Book;
  private status: BookStatus = 'AVAILABLE';

  constructor(private uiService: UiService, private bookService: BookService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddForm = val));
  }

  onSubmit(): void {
    if (!(this.id && this.title && this.author && this.year && this.genre)) {
      alert('Kohustuslikud väljad on puudu');
      return;
    }
    const now = new Date();
    this.book = {
      id: this.id,
      title: this.title,
      author: this.author,
      genre: this.genre,
      year: this.year,
      added: now.toString(),
      checkOutCount: 0,
      status: this.status,
      dueDate: 'null',
      comment: this.comment,
    };
    this.bookService.saveBook(this.book);
    alert('Raamat lisatud!');
  }
}
