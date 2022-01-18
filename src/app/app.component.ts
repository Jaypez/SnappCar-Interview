import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  switchMap,
  tap,
  BehaviorSubject,
  of,
} from 'rxjs';
import { City, CitySearchService } from './services/city-search.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  sort = 'price';
  distance = '3000';
  selectedCity?: City;

  searchEvent$ = new Subject<string>();
  clickEvent$ = new Subject<City>();
  sortChange$ = new BehaviorSubject<string>(this.sort);
  distChange$ = new BehaviorSubject<string>(this.distance);
  cityList: City[] = [];

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
          tap(events => this.selectedCity = events[0]),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((params) => {
            if (params[0] && params[1] && params[2]) {

              // Not sure if it is CORS related, but getting a 403 error through the link provided,
              // trying to fix it took a lot of time so I just left the implementation here

              // return this.carSearchService.searchCars(
              //   params[0],
              //   params[1],
              //   params[2]
              // );

              return of([]);
            }

            return of([]);
          })
        )
        .subscribe((result) => {
          // of course, here we would pass the returned vehicles into a list to display
          console.log(result)
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
