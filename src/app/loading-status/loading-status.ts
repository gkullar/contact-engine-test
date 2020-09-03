import { HttpErrorResponse } from '@angular/common/http';

export interface LoadingStatus<Data> {
  data: Data | null;
  error: HttpErrorResponse | null;
  hasError: boolean;
  hasLoaded: boolean;
  isLoading: boolean;
}
