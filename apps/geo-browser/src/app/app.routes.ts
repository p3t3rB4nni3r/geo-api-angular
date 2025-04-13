import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@geo-api-angular/features').then((m) => m.featuresRoute),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
