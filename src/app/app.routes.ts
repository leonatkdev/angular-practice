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

  // Lazy-loaded HTTP fetch demo (HttpClient + RxJS search-as-you-type).
  {
    path: 'fetch',
    title: 'Fetch',
    loadComponent: () =>
      import('./features/fetch-practice/pages/fetch-practice').then(
        (m) => m.FetchPractice,
      ),
  },
  { path: 'state-practice', loadComponent: () => import('./features/state-practice/pages/state-practice').then((m) => m.StatePractice) },
  { path: 'input-practice', title: 'Input', loadComponent: () => import('./features/input-practice/pages/input-practice').then((m) => m.InputPractice) },
  { path: 'two-way-practice', title: 'Two-way', loadComponent: () => import('./features/two-way-practice/pages/two-way-practice').then((m) => m.TwoWayPractice) },
  { path: 'shared-store-practice', title: 'Shared Store', loadComponent: () => import('./features/shared-store-practice/pages/shared-store-practice').then((m) => m.SharedStorePractice) },
  { path: 'computed-effect-practice', title: 'Computed & Effect', loadComponent: () => import('./features/computed-effect-practice/pages/computed-effect-practice').then((m) => m.ComputedEffectPractice) },
  { path: 'reactive-forms-practice', title: 'Reactive Forms', loadComponent: () => import('./features/reactive-forms-practice/pages/reactive-forms-practice').then((m) => m.ReactiveFormsPractice) },
  { path: 'pipes-practice', title: 'Pipes', loadComponent: () => import('./features/pipes-practice/pages/pipes-practice').then((m) => m.PipesPractice) },
  { path: 'state-input', title: 'State Input', loadComponent: () => import('./features/state-input/pages/state-input').then((m) => m.StateInput) },

  // Wildcard: matches anything that fell through above (404).
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then((m) => m.NotFound),
  },
];
