import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SmsProviderFormComponent } from './sms-provider-form.component';

const formValueMock = {
  country_id: 1,
  name: 'Albania',
  originating_number: '123456789',
};

describe('SmsProviderFormComponent', () => {
  let component: SmsProviderFormComponent;
  let fixture: ComponentFixture<SmsProviderFormComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SmsProviderFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(SmsProviderFormComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should disable the form when submitting', () => {
      const change = new SimpleChange(null, true, false);

      component.ngOnChanges({ isSubmitting: change });

      expect(component.form.disabled).toBe(true);
      expect(component.form.enabled).toBe(false);
    });

    it('should enable the form when not submitting', () => {
      const change = new SimpleChange(null, false, false);

      component.ngOnChanges({ isSubmitting: change });

      expect(component.form.disabled).toBe(false);
      expect(component.form.enabled).toBe(true);
    });

    it('should not enable or disable the form when there is no submitting change', () => {
      spyOn(component.form, 'disable');
      spyOn(component.form, 'enable');

      const change = new SimpleChange(null, null, null);

      component.ngOnChanges({ countriesState: change });

      expect(component.form.disable).not.toHaveBeenCalled();
      expect(component.form.enable).not.toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should emit a submitForm event with the correct data', () => {
      spyOn(component.submitForm, 'emit');

      component.form.setValue(formValueMock);
      component.onSubmit();

      expect(component.submitForm.emit).toHaveBeenCalledTimes(1);
      expect(component.submitForm.emit).toHaveBeenCalledWith(formValueMock);
    });
  });
});
