import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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
      .pipe(map((res) => res));
  }
}
