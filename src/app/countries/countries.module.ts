import { NgModule } from '@angular/core';

import { FormControlsModule } from '../form-controls/form-controls.module';
import { CountryControlComponent } from './country-control.component';

@NgModule({
  imports: [FormControlsModule],
  exports: [CountryControlComponent],
  declarations: [CountryControlComponent],
  providers: [],
})
export class CountriesModule {}
