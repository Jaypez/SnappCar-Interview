import { Component } from '@angular/core';
import { ISearchResult } from '../model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchResults: ISearchResult[] = [];

  updateSearchResult(event: ISearchResult[]) {
    this.searchResults = event;
  }
}
