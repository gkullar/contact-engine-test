import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SpinnerModule } from '../spinner';
import { SelectControlComponent } from './select-control.component';

const optionsMock = [{ name: 'Developer', displayName: 'Dev' }];

describe('SelectControlComponent', () => {
  let component: SelectControlComponent;
  let fixture: ComponentFixture<SelectControlComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [SpinnerModule],
      declarations: [SelectControlComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(SelectControlComponent);

    component = fixture.componentInstance;
    component.control = new FormControl();
  });

  describe('ngOnChanges', () => {
    it('should set the options correctly when there are changes', () => {
      const change = new SimpleChange(null, optionsMock, false);

      component.displayKey = 'displayName';
      component.ngOnChanges({ options: change });

      expect(component.options[0][component.displayKey]).toEqual('Dev');
    });

    it('should not set the options if there are no changes', () => {
      const change = new SimpleChange(null, null, false);

      component.ngOnChanges({ options: change });

      expect(component.options).toBeUndefined();
    });
  });

  describe('optionsLoading', () => {
    it('should display the SpinnerComponent when options are loading', () => {
      component.optionsLoading = true;

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('app-spinner'));

      expect(element).toBeTruthy();
    });

    it('should not display the SpinnerComponent when options are not loading', () => {
      component.optionsLoading = false;

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('app-spinner'));

      expect(element).toBeFalsy();
    });
  });
});
