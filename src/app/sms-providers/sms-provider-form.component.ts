import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Country } from '../countries';
import { LoadingStatus } from '../loading-status';
import { SmsProvider } from './sms-provider';

@Component({
  selector: 'app-sms-provider-form',
  templateUrl: './sms-provider-form.component.html',
  styleUrls: ['./sms-provider-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsProviderFormComponent implements OnChanges {
  @Input() countriesState: LoadingStatus<Country[]>;

  @Input() isSubmitting = false;

  @Output() submitForm = new EventEmitter<SmsProvider>();

  form = this.fb.group({
    country_id: [null, Validators.required],
    name: [null, Validators.required],
    originating_number: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isSubmitting && !changes.isSubmitting.firstChange) {
      changes.isSubmitting.currentValue
        ? this.form.disable()
        : this.form.enable();
    }
  }

  onSubmit(): void {
    this.submitForm.emit(this.form.value);
  }
}
