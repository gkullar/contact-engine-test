import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SmsProvider } from './sms-provider';

@Injectable({ providedIn: 'root' })
export class SmsProvidersApiService {
  constructor(private http: HttpClient) {}

  static getBaseUrl(): string {
    return `${environment.api.root}/SmsProviders`;
  }

  get(): Observable<SmsProvider[]> {
    const url = SmsProvidersApiService.getBaseUrl();

    return this.http.get<SmsProvider[]>(url);
  }

  post(smsProvider: SmsProvider): Observable<Response> {
    const url = SmsProvidersApiService.getBaseUrl();
    const options = { ...smsProvider };

    return this.http.post<Response>(url, options);
  }
}
