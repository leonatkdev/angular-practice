import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
})

export class ProductDetail {
  private readonly productsService = inject(Products);

  // With `withComponentInputBinding()`, the route param `:id`
  // is bound directly to this signal input.
  readonly id = input.required<string>();

  protected readonly product = computed(() =>
    this.productsService.getById(Number(this.id()))
  );
}
