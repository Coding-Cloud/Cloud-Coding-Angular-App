import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../notifications/notification.service';
import { navigation } from '../../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticated)).pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.notificationService.error(
            'Vous devez être connecté pour accéder à ce contenu'
          );
          this.router.navigate([navigation.auth.path]);
        }
      })
    );
  }
}
