import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';

import { CountriesApiService } from './countries-api.service';
import { Country } from './country';

const countriesMock: Country[] = [
  {
    displayName: 'Albania',
    id: 1,
  },
];

describe('CountriesApiService', () => {
  let httpClient: HttpClient;
  let service: CountriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesApiService],
    });

    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(CountriesApiService);
  });

  describe('get', () => {
    it('should return the countries data', () => {
      const response = cold('-a|', { a: countriesMock });
      const expected = cold('-b|', { b: countriesMock });

      spyOn(httpClient, 'get').and.returnValue(response);

      expect(service.get()).toBeObservable(expected);
    });
  });
});
