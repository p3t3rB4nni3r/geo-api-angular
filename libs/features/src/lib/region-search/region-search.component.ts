import {
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { catchError, debounceTime, of, take, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { NgClass } from '@angular/common';
import {
  MatFormField,
  MatInput,
  MatPrefix,
  MatSuffix,
} from '@angular/material/input';
import { Departement, GeoApiService, Region } from '@geo-api-angular/api';
import { MatLabel } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'lib-region-search',
  templateUrl: './region-search.component.html',
  styleUrls: ['./region-search.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatFormField,
    MatAutocomplete,
    MatOption,
    MatLabel,
    MatInput,
    MatFormField,
    TranslocoDirective,
    MatIconModule,
    MatSuffix,
    MatPrefix,
    MatChipSet,
    MatChip,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButtonModule,
    NgClass,
    MatTooltipModule,
    MatToolbar,
  ],
})
export class RegionSearchComponent {
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _geoApiService: GeoApiService = inject(GeoApiService);
  private readonly _router: Router = inject(Router);

  formGroup = new FormGroup({
    regionControl: new FormControl<string | undefined>(undefined),
  });

  $regions: WritableSignal<Region[]> = signal([]);
  $selectedRegion: WritableSignal<Region | undefined> = signal(undefined);
  $departments: WritableSignal<Departement[]> = signal([]);
  $loading: WritableSignal<boolean> = signal(false);

  dataSource: MatTableDataSource<Departement> = new MatTableDataSource();
  displayedColumns: string[] = ['nom', 'code', 'codeRegion'];

  constructor() {
    this.trackSelectedRegion();
  }

  private trackSelectedRegion(): void {
    effect(() => {
      const region = this.$selectedRegion();
      if (region) {
        this.fetchDepartmentsByRegion(region.code);
      } else {
        this.$departments.set([]);
      }
    });
  }

  //todo: defer to an Angular service that would fill a store
  private fetchDepartmentsByRegion(regionCode: string): void {
    this._geoApiService
      .getDepartementsByRegionCode(regionCode)
      .pipe(
        debounceTime(300),
        take(1),
        tap((departments: Departement[]) => {
          this.$departments.set(departments);
          this.dataSource.data = departments;
        }),
        catchError((error) => {
          this._snackBar.open(`Error: ${error.message}`, 'Close');
          return of([]);
        })
      )
      .subscribe();
  }

  onRegionSearch(): void {
    const partialRegionName = this.regionControl?.value;
    if (partialRegionName) {
      this.$selectedRegion.set(undefined);
      this.$loading.set(true);
      this.searchRegions(partialRegionName.toLowerCase());
    }
  }

  //todo: defer to an Angular service that would fill a store
  private searchRegions(partialRegionName: string): void {
    this._geoApiService
      .searchRegions(partialRegionName)
      .pipe(
        debounceTime(300),
        take(1),
        tap((regions: Region[]) => {
          this.$regions.set(regions);
          this.$loading.set(false);
        }),
        catchError((error) => {
          this._snackBar.open(`Error: ${error.message}`, 'Close');
          this.$loading.set(false);
          return of([]);
        })
      )
      .subscribe();
  }

  onRegionSelect(event: MatAutocompleteSelectedEvent): void {
    const region = event.option.value;
    this.$selectedRegion.set(region);
    this.regionControl?.setValue(region.nom);
  }

  get regionControl() {
    return this.formGroup.get('regionControl');
  }

  goToDepartment(nom: string, code: number | string | undefined): void {
    this._router.navigate(['/cities', nom, code]); // Adjust route as needed
  }
}