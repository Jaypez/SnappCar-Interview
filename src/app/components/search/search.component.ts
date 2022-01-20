import { Component, OnInit, Output } from '@angular/core';
import {
  Subject,
  BehaviorSubject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  combineLatest,
  tap,
} from 'rxjs';
import { ISearchResult } from 'src/app/model';
import { City, CitySearchService, SearchService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  sort = 'price';
  distance = '3000';
  selectedCity?: City;

  searchEvent$ = new Subject<string>();
  clickEvent$ = new Subject<City>();
  sortChange$ = new BehaviorSubject<string>(this.sort);
  distChange$ = new BehaviorSubject<string>(this.distance);
  cityList: City[] = [];

  @Output()
  searchResult = new Subject<ISearchResult[]>();

  private subscriptions: Subscription[] = [];

  constructor(
    private citySearchService: CitySearchService,
    private carSearchService: SearchService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.searchEvent$
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((term) => this.citySearchService.searchCities(term))
        )
        .subscribe((result) => (this.cityList = result))
    );

    this.subscriptions.push(
      combineLatest([this.clickEvent$, this.sortChange$, this.distChange$])
        .pipe(
          tap((events) => {
            this.selectedCity = events[0];
            this.cityList = [];
          }),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((params) => {
            return this.carSearchService.searchCars(
              params[0],
              params[1],
              params[2]
            );
          })
        )
        .subscribe({
          next: (result) => {
            this.searchResult.next(result);
          },
          error: (error) => {
            console.error(error);
          },
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
