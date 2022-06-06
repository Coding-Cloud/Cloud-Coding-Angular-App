import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from '../../../../core/core.state';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { actionFriendRequestsRetrieveAllSentError } from './friend-requests.actions';

@Injectable()
export class FriendRequestsEffects {
  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFriendRequestsRetrieveAllSentError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
