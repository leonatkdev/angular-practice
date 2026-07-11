import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../services/products';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
})
export class ProductList {
  private readonly productsService = inject(Products);
  protected readonly products = this.productsService.getAll();
}
