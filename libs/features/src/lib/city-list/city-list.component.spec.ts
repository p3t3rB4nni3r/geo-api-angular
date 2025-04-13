import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityListComponent } from './city-list.component';
import { GeoApiService } from '@geo-api-angular/api';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { provideHttpClient } from '@angular/common/http';

describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  const mockGeoApiService = {
    getCommunesByDepartementCode: jest.fn().mockReturnValue(
      of([
        { nom: 'Paris', code: '75' }, // Minimal Commune mock
      ])
    ),
  };

  const mockActivatedRoute = {
    paramMap: of(
      new Map([
        ['code', '75'], // Mock the 'code' parameter
        ['name', 'Ile-de-France'], // Mock the 'name' parameter
      ])
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CityListComponent,
        TranslocoTestingModule.forRoot({
          translocoConfig: {
            flatten: { aot: true },
          },
        }),
      ],
      providers: [
        provideHttpClient(),
        { provide: GeoApiService, useValue: mockGeoApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch communes when region code is set', () => {
    component.$regionCode.set('75'); // Set region code
    expect(mockGeoApiService.getCommunesByDepartementCode).toHaveBeenCalledWith(
      '75'
    );
  });
});
