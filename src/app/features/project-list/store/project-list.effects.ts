import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../core/core.state';
import { ProjectListService } from '../project-list.service';
import {
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllError,
  actionProjectsRetrieveAllSuccess
} from './project-list.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';

@Injectable()
export class ProjectListEffects {
  retrieveAll = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsRetrieveAll),
      exhaustMap((action) =>
        this.projectListService.getProjects().pipe(
          map((projects) => actionProjectsRetrieveAllSuccess({ projects })),
          catchError((error) =>
            of(actionProjectsRetrieveAllError({ message: error.message }))
          )
        )
      )
    )
  );

  retrieveAllError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsRetrieveAllError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private projectListService: ProjectListService,
    private notificationService: NotificationService
  ) {}
}
