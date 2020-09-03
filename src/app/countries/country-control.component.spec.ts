import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryControlComponent } from './country-control.component';

describe('CountryControlComponent', () => {
  let component: CountryControlComponent;
  let fixture: ComponentFixture<CountryControlComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CountryControlComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(CountryControlComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
