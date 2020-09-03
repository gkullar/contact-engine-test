import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { CountriesApiService, Country } from './countries';
import { SmsProvider, SmsProvidersApiService } from './sms-providers';

const countriesMock: Country[] = [
  {
    displayName: 'Albania',
    id: 1,
  },
  {
    displayName: 'Australia',
    id: 2,
  },
];

const smsProvidersMock: SmsProvider[] = [
  {
    country_id: 1,
    name: 'SMS Albania',
    originating_number: '123456789',
  },
  {
    country_id: 2,
    name: 'SMS Australia',
    originating_number: '123456789',
  },
  {
    country_id: 3,
    name: 'SMS Unknown',
    originating_number: '123456789',
  },
];

function configureTestingModule(
  smsProvidersApiPostMock = of(new Response())
): void {
  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, MatSnackBarModule],
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      {
        provide: CountriesApiService,
        useValue: {
          get: jasmine.createSpy('get').and.returnValue(of(countriesMock)),
        },
      },
      {
        provide: SmsProvidersApiService,
        useValue: {
          get: jasmine.createSpy('get').and.returnValue(of(smsProvidersMock)),
          post: jasmine
            .createSpy('post')
            .and.returnValue(smsProvidersApiPostMock),
        },
      },
    ],
  });
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let countriesApiService: CountriesApiService;
  let smsProvidersApiService: SmsProvidersApiService;
  let snackbar: MatSnackBar;

  function setupFixtureAndComponent(): void {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    countriesApiService = TestBed.inject(CountriesApiService);
    smsProvidersApiService = TestBed.inject(SmsProvidersApiService);
    snackbar = TestBed.inject(MatSnackBar);

    spyOn(snackbar, 'open');
  }

  it('should create', () => {
    configureTestingModule();
    setupFixtureAndComponent();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('handleSubmitForm', () => {
    it('should update the sms providers list when there is no error', () => {
      configureTestingModule();
      setupFixtureAndComponent();

      component.handleSubmitForm(smsProvidersMock[0]);

      const expected = [
        {
          country: 'Albania',
          name: 'SMS Albania',
          originating_number: '123456789',
        },
        {
          country: 'Australia',
          name: 'SMS Australia',
          originating_number: '123456789',
        },
        {
          country: 'Unknown Country',
          name: 'SMS Unknown',
          originating_number: '123456789',
        },
      ];

      expect(component.smsProvidersState.data).toEqual(expected);
    });

    it('should not update the sms providers list when there is an error', () => {
      const postMock = throwError({ error: 'error message' });

      configureTestingModule(postMock);
      setupFixtureAndComponent();

      component.handleSubmitForm(smsProvidersMock[0]);

      expect(component.smsProvidersState.data).toBeNull();
    });
  });
});
