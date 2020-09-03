import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { CountriesModule } from '../countries';
import { FormControlsModule } from '../form-controls/form-controls.module';
import { SpinnerModule } from '../spinner';
import { SmsProviderFormComponent } from './sms-provider-form.component';
import { SmsProvidersTableComponent } from './sms-providers-table.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CountriesModule,
    FormControlsModule,
    SpinnerModule,
  ],
  exports: [SmsProviderFormComponent, SmsProvidersTableComponent],
  declarations: [SmsProviderFormComponent, SmsProvidersTableComponent],
  providers: [],
})
export class SmsProvidersModule {}
