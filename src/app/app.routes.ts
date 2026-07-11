import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home';
import { ProductList } from './features/products/pages/product-list';
import { ProductDetail } from './features/products/pages/product-detail';

export const routes: Routes = [
  // Redirect the empty path to /home.
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Eagerly-loaded route: component is bundled with the app.
  { path: 'home', component: Home, title: 'Home' },

  // Lazy-loaded route: this chunk is only fetched when visited.
  {
    path: 'about',
    title: 'About',
    loadComponent: () =>
      import('./features/about/pages/about').then((m) => m.About),
  },

  // List + detail. `:id` is a route parameter read by ProductDetail.
  { path: 'products', component: ProductList, title: 'Products' },
  { path: 'products/:id', component: ProductDetail, title: 'Product' },

  // Wildcard: matches anything that fell through above (404).
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then((m) => m.NotFound),
  },
];
