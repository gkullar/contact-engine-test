import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SpinnerModule } from '../spinner';
import { SelectControlComponent } from './select-control.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SpinnerModule,
  ],
  exports: [SelectControlComponent],
  declarations: [SelectControlComponent],
  providers: [],
})
export class FormControlsModule {}
