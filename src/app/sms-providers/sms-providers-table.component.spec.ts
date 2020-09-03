import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SpinnerModule } from '../spinner';
import { SmsProvidersTableComponent } from './sms-providers-table.component';

const smsProvidersStateMock = {
  data: null,
  error: null,
  hasError: false,
  hasLoaded: false,
  isLoading: false,
};

describe('SmsProvidersTableComponent', () => {
  let component: SmsProvidersTableComponent;
  let fixture: ComponentFixture<SmsProvidersTableComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [SpinnerModule],
      declarations: [SmsProvidersTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(SmsProvidersTableComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('smsProvidersState', () => {
    it('should display the SpinnerComponent when data is loading', () => {
      component.smsProvidersState = {
        ...smsProvidersStateMock,
        isLoading: true,
      };

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('app-spinner'));

      expect(element).toBeTruthy();
    });

    it('should not display the SpinnerComponent when data is not loading', () => {
      component.smsProvidersState = {
        ...smsProvidersStateMock,
        isLoading: false,
      };

      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('app-spinner'));

      expect(element).toBeFalsy();
    });
  });
});
