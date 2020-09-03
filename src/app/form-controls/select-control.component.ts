import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { SelectControl } from './select-control';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlComponent implements SelectControl, OnChanges {
  @Input()
  control: FormControl;

  @Input()
  options: any[];

  @Input()
  optionsLoading: boolean;

  @Input()
  valueKey: string;

  @Input()
  displayKey: string;

  @Input()
  noOptionsMessage = 'No options available';

  @Input()
  placeholderText: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.currentValue) {
      this.options = [...changes.options.currentValue];
    }
  }
}
