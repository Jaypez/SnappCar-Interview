import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const cities: City[] = [
  { name: 'Utrecht', lat: '52.09073739999999', lng: '5.1214201' },
  { name: 'Amsterdam', lat: '52.3679843', lng: '4.9035614' },
  { name: 'Rotterdam', lat: '51.9244201', lng: '4.4777326' },
  { name: 'The Hague', lat: '52.0704978', lng: '4.3006999' },
  { name: 'Maastricht', lat: '50.8513682', lng: '5.6909725' },
  { name: 'Almere', lat: '52.3507849', lng: '5.2647016' },
  { name: 'Almelo', lat: '52.3670267', lng: '6.668491899999999' },
  { name: 'Amstelveen', lat: '52.3114207', lng: '4.870087' },
  { name: 'Bunnik', lat: '52.043969', lng: '5.2198687' },
  { name: 'Capelle', lat: '51.9301505', lng: '4.5777053' },
  { name: 'Hertogenbosch', lat: '51.6978162', lng: '5.3036748' }
];

@Injectable({ providedIn: 'root' })
export class CitySearchService {
  constructor() {}

  searchCities(term: string): Observable<City[]> {
    let filteredCities: City[] = [];

    if(term){
      filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    return of(filteredCities);
  }
}

export interface City {
  name: string;
  lat: string;
  lng: string;
}

