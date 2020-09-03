import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<mat-spinner
    color="accent"
    mode="indeterminate"
    diameter="24"
  ></mat-spinner>`,
})
export class SpinnerComponent {}
