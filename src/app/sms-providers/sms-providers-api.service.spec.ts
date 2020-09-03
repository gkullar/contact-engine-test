import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { SmsProvider } from './sms-provider';
import { SmsProvidersApiService } from './sms-providers-api.service';

const smsProvidersMock: SmsProvider[] = [
  {
    country_id: 1,
    name: 'SMS TEST',
    originating_number: '123456789',
  },
];

describe('SmsProvidersApiService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: SmsProvidersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmsProvidersApiService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SmsProvidersApiService);
  });

  describe('get', () => {
    it('should return sms providers data', () => {
      const response = cold('-a|', { a: smsProvidersMock });
      const expected = cold('-b|', { b: smsProvidersMock });

      spyOn(httpClient, 'get').and.returnValue(response);

      expect(service.get()).toBeObservable(expected);
    });
  });

  describe('post', () => {
    it('should post the options correctly', () => {
      service.post(smsProvidersMock[0]).subscribe();

      const httpRequest = httpMock.expectOne(
        SmsProvidersApiService.getBaseUrl()
      );

      httpRequest.flush(of(new Response()));

      httpMock.verify();

      expect(httpRequest.request.body).toEqual(smsProvidersMock[0]);
    });
  });
});
