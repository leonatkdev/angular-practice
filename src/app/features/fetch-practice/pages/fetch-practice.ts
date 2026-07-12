import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  catchError,
  map,
} from 'rxjs/operators';
import { ProductSearch, Product } from '../services/product-search';

// A small view-model so the template can render loading / error / data
// from ONE observable, without juggling separate booleans.
interface SearchState {
  loading: boolean;
  error: boolean;
  products: Product[];
}

@Component({
  selector: 'app-fetch-practice',
  imports: [AsyncPipe],
  templateUrl: './fetch-practice.html',
  styleUrl: './fetch-practice.css',
})
export class FetchPractice {
  private readonly productSearch = inject(ProductSearch);

  // Every keystroke pushes the current text into this stream.
  private readonly query$ = new Subject<string>();

  // The reactive pipeline — this is the heart of the "enterprise" flow.
  protected readonly state$ = this.query$.pipe(
    startWith(''),                 // emit once on load so we show something
    debounceTime(300),             // wait for a typing pause (avoids spamming the API)
    distinctUntilChanged(),        // ignore if the text didn't actually change
    switchMap((q) => {
      const term = q.trim();
      if (!term) {
        return of<SearchState>({ loading: false, error: false, products: [] });
      }
      // switchMap CANCELS the previous in-flight request when a new term
      // arrives — so stale, out-of-order responses can't overwrite fresh ones.
      return this.productSearch.search(term).pipe(
        map((products) => ({ loading: false, error: false, products })),
        catchError(() => of({ loading: false, error: true, products: [] })),
        startWith({ loading: true, error: false, products: [] } as SearchState),
      );
    }),
  );

  // Called from the template's (input) event.
  protected onInput(value: string): void {
    this.query$.next(value);
  }
}
