import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/book';
import { BookService } from './services/book.service';
import { Page } from './models/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
