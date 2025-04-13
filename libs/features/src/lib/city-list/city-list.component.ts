import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commune, GeoApiService } from '@geo-api-angular/api';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, take } from 'rxjs';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-city-list',
  templateUrl: './city-list.component.html',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatPaginatorModule,
    TranslocoDirective,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _geoApiService = inject(GeoApiService);
  private readonly _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = [
    'nom',
    'codesPostaux',
    'population',
    'codeDepartement',
    'code',
    'codeEpci',
    'codeRegion',
  ];
  dataSource = new MatTableDataSource<Commune>([]);

  $communes: WritableSignal<Commune[]> = signal([]);
  $regionCode: WritableSignal<string | null> = signal(null);
  $regionName: WritableSignal<string | null> = signal(null);

  constructor() {
    this.setupEffects();
  }

  private setupEffects() {
    // Fetch communes when region code changes
    effect(() => {
      const code = this.$regionCode();
      if (code) this.fetchCommunes(code);
    });

    effect(() => {
      this.dataSource.data = this.$communes();
    });
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.$regionCode.set(params.get('code'));
      this.$regionName.set(params.get('name'));
    });
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  fetchCommunes(code: string | undefined | null) {
    return code
      ? this._geoApiService
          .getCommunesByDepartementCode(code)
          .pipe(take(1))
          .subscribe({
            next: (data: Commune[]) => this.$communes.set(data),
            error: (err) =>
              this._snackBar.open(`Failed to fetch communes: ${err}`),
          })
      : of([]);
  }

  async back() {
    await this._router.navigate(['']);
  }
}
