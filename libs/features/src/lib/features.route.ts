import { Route } from '@angular/router';
import { RegionSearchComponent } from './region-search/region-search.component';
import { CityListComponent } from './city-list/city-list.component';

export const featuresRoute: Route[] = [
  {
    path: '',
    redirectTo: 'region',
    pathMatch: 'full',
  },
  {
    path: 'region',
    component: RegionSearchComponent,
  },
  {
    path: 'cities/:name/:code',
    component: CityListComponent,
  },
];