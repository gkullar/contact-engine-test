import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [MatProgressSpinnerModule],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
  providers: [],
})
export class SpinnerModule {}
