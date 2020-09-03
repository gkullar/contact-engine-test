import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { CountriesApiService } from './countries';
import {
  initialLoadingStatus,
  LoadingStatus,
  withLoadingStatus,
} from './loading-status';
import {
  SmsProvider,
  SmsProviderListItem,
  SmsProvidersApiService,
} from './sms-providers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  countriesState$ = withLoadingStatus(this.countriesApiService.get());

  smsProvidersState: LoadingStatus<
    SmsProviderListItem[]
  > = initialLoadingStatus;

  isSubmitting = false;

  private refreshData$ = new Subject();

  smsProvidersState$ = this.refreshData$.pipe(
    switchMap(() =>
      withLoadingStatus(
        this.smsProvidersApiService.get().pipe(
          withLatestFrom(this.countriesState$),
          map(([smsProviders, countriesState]) =>
            smsProviders.map((smsProvider) => {
              const country = countriesState.data.find(
                (item) => item.id === smsProvider.country_id
              );

              return {
                country: country ? country.displayName : 'Unknown Country',
                name: smsProvider.name,
                originating_number: smsProvider.originating_number,
              };
            })
          )
        )
      )
    )
  );

  constructor(
    private snackBar: MatSnackBar,
    private countriesApiService: CountriesApiService,
    private smsProvidersApiService: SmsProvidersApiService
  ) {
    this.smsProvidersState$.subscribe(
      (state) => (this.smsProvidersState = state)
    );
  }

  ngOnInit(): void {
    this.refreshData$.next();
  }

  handleSubmitForm(smsProvider: SmsProvider): void {
    withLoadingStatus(this.smsProvidersApiService.post(smsProvider)).subscribe(
      (state) => {
        this.isSubmitting = state.isLoading;

        if (!state.hasError && state.hasLoaded) {
          this.showSuccess();
          this.refreshData$.next();
        }

        if (state.hasError) {
          this.showError(state.error.error);
        }
      }
    );
  }

  private showError(message: string): void {
    this.snackBar.open(`Error: ${message}`, '', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }

  private showSuccess(): void {
    this.snackBar.open(`SMS Provider successfully added`, '', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
