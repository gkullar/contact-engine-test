import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SelectControl } from '../form-controls/select-control';
import { Country } from './country';

@Component({
  selector: 'app-country-control',
  templateUrl: './country-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryControlComponent implements SelectControl {
  @Input() control: FormControl;

  @Input() displayKey = 'displayName';

  @Input() noOptionsMessage = 'No countries are available.';

  @Input() options: Country[];

  @Input() optionsLoading: boolean;

  @Input() placeholderText = 'Country';

  @Input() valueKey = 'id';
}
