import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionSearchComponent } from './region-search.component';
import { GeoApiService } from '@geo-api-angular/api';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

describe('RegionSearchComponent', () => {
  let component: RegionSearchComponent;
  let fixture: ComponentFixture<RegionSearchComponent>;

  const mockGeoApiService = {
    searchRegions: jest
      .fn()
      .mockReturnValue(of([{ nom: 'Île-de-France', code: '11' }])),
    getDepartementsByRegionCode: jest.fn().mockReturnValue(of([])),
  };

  const mockSnackBar = {
    open: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegionSearchComponent,
        TranslocoTestingModule.forRoot({
          translocoConfig: {
            flatten: { aot: true },
          },
        }),
      ],
      providers: [
        { provide: GeoApiService, useValue: mockGeoApiService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected region when a region is selected', () => {
    const mockRegion = { nom: 'Île-de-France', code: '11' };
    const event: MatAutocompleteSelectedEvent = {
      option: { value: mockRegion },
    } as any;

    // Spy on regionControl setValue method
    const setValueSpy = jest.spyOn(component.regionControl!, 'setValue');

    component.onRegionSelect(event);

    expect(component.$selectedRegion()).toEqual(mockRegion);
    expect(setValueSpy).toHaveBeenCalledWith('Île-de-France');
  });

  it('should trigger the region search when typing a region name', () => {
    const searchValue = 'Île-de-France';
    const partialRegionName = 'ile'; // Correct partial input to be sent

    // Simulate typing by setting the form control value
    component.regionControl!.setValue(searchValue);

    // Call the onRegionSearch method with the expected partial input
    component.onRegionSearch();

    // Verify that the regions array was updated
    expect(component.$regions()).toEqual([
      { nom: 'Île-de-France', code: '11' },
    ]);
  });

  it('should set departments when a region is selected', () => {
    const region = { nom: 'Île-de-France', code: '11' }; // Mock region
    const departments = [{ nom: 'Paris', code: '75' }]; // Mock departments

    // Set up the mock response for getDepartementsByRegionCode
    mockGeoApiService.getDepartementsByRegionCode.mockReturnValue(
      of(departments)
    );

    // Trigger region selection (simulate user selecting a region from the autocomplete)
    component.onRegionSelect({
      option: { value: region },
    } as MatAutocompleteSelectedEvent);

    // Verify that the selected region has been set
    expect(component.$selectedRegion()).toEqual(region);

    // Trigger change detection to ensure that the departments are set in the component
    fixture.detectChanges();

    // Verify that the departments are updated in the component's state
    expect(component.$departments()).toEqual(departments);

    // Verify that the data source is updated with the departments (this could be part of the UI testing)
    expect(component.dataSource.data).toEqual(departments);
  });
});
