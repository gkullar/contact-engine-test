import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SmsProvidersApiService } from '../sms-providers/sms-providers-api.service';
import { Country } from './country';

@Injectable({ providedIn: 'root' })
export class CountriesApiService {
  constructor(private http: HttpClient) {}

  get(): Observable<Country[]> {
    const url = `${SmsProvidersApiService.getBaseUrl()}/Countries`;

    return this.http.get<Country[]>(url);
  }
}
