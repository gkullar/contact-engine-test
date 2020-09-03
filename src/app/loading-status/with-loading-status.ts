import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith } from 'rxjs/operators';

import { LoadingStatus } from './loading-status';

export const initialLoadingStatus = {
  data: null,
  error: null,
  hasError: false,
  hasLoaded: false,
  isLoading: false,
};

export function withLoadingStatus<T>(
  httpRequest: Observable<T>
): Observable<LoadingStatus<T>> {
  return httpRequest.pipe(
    map((data) => ({
      data,
      error: null,
      hasError: false,
      hasLoaded: true,
      isLoading: false,
    })),
    startWith({
      data: null,
      error: null,
      hasError: false,
      hasLoaded: false,
      isLoading: true,
    }),
    catchError((error) =>
      of({
        data: null,
        error,
        hasError: true,
        hasLoaded: false,
        isLoading: false,
      })
    ),
    shareReplay(1)
  );
}
