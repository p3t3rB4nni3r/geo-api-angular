import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Region {
  nom: string;
  code: string;
}

export interface Departement {
  nom: string;
  code: string;
}

export interface Commune {
  nom: string;
  code: string;
}

@Injectable({ providedIn: 'root' })
export class GeoApiService {
  private readonly apiUrl = 'https://geo.api.gouv.fr';
  private readonly http = inject(HttpClient);

  searchRegions(name: string): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/regions?nom=${name}`);
  }

  getDepartementsByRegionCode(regionCode: string): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiUrl}/regions/${regionCode}/departements`);
  }

  getCommunesByDepartementCode(deptCode: string): Observable<Commune[]> {
    return this.http.get<Commune[]>(`${this.apiUrl}/departements/${deptCode}/communes`);
  }
}
