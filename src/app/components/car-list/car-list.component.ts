import { Component, Input, OnInit } from '@angular/core';
import { ISearchResult } from 'src/app/model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @Input() list: ISearchResult[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
