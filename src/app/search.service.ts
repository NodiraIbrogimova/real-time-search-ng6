import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, interval } from 'rxjs';;
import {
  map, debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = '?search=';

  constructor(private http: Http) { }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(_ => interval(50), term => { this.searchEntries(term) }));
  }

  searchEntries(term: any) {
    this.http.get(this.baseUrl + this.queryUrl + term).pipe(map(res => {
      res.json()
    }));
  }


}
