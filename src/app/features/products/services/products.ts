import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class Products {
  private readonly products: Product[] = [
    { id: 1, name: 'Keyboard', price: 79, description: 'A clacky mechanical keyboard.' },
    { id: 2, name: 'Mouse', price: 45, description: 'An ergonomic wireless mouse.' },
    { id: 3, name: 'Monitor', price: 320, description: 'A 27-inch 4K display.' },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
