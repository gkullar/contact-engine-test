import { FormControl } from '@angular/forms';

export interface SelectControl {
  control: FormControl;

  options: any[];

  optionsLoading: boolean;

  valueKey: string;

  displayKey: string;

  noOptionsMessage: string;

  placeholderText: string;
}
