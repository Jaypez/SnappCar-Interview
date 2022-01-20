import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ISearchResult } from '../model';
import { City } from './city-search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchCars(city: City, sort: string, distance: string) {
    return this.http
      .get(
        `https://api.snappcar.nl/v2/search/query?sort=${sort}&country=NL&lat=${city.lat}&lng=${city.lng}&max-distance=${distance}`
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Could not Access API: ' + error.status));
        }),
        map((res: any) => res.results as ISearchResult[])
      );
  }
}
