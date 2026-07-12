import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Shape of a single product from the DummyJSON API.
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand?: string;
}

// The API wraps the array in an envelope: { products, total, skip, limit }.
interface SearchResponse {
  products: Product[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ProductSearch {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/products';

  // Returns an Observable. Nothing runs until someone subscribes
  // (the async pipe / switchMap in the component does that).
  search(query: string): Observable<Product[]> {
    return this.http
      .get<SearchResponse>(`${this.baseUrl}/search`, {
        // Angular serializes this to ?q=<query> and URL-encodes it for us.
        params: { q: query },
      })
      // Unwrap the envelope so callers just get Product[].
      .pipe(map((res) => res.products));
  }
}
