import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectJWTToken } from '../auth/auth.selectors';
import { first } from 'rxjs/operators';
import { flatMap } from 'rxjs/internal/operators';
import { AppState } from '../core.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectJWTToken).pipe(
      first(),
      flatMap((token) =>
        next.handle(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        )
      )
    );
  }
}
