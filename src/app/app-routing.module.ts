import { Route } from '@angular/router';
import { ListComponent } from './presentation/pages/list/list.component';
//import { PokemonListComponent } from './presentation/pages/pokemon-list/pokemon-list.component';

export const ROUTES: Route[] = [
  {
    path: 'list', 
    loadComponent: () => import('./presentation/pages/list/list.component').then(mod => mod.ListComponent),
  },
  {
    path: 'detail', 
    loadComponent: () => import('./presentation/components/detail/detail.component').then(mod => mod.DetailComponent),
  },
  { 
    path: '',   
    redirectTo: '/list', 
    pathMatch: 'full' },
  {
    path: '**',
    component: ListComponent,
  }
];