import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../core/core.state';
import { ProjectListService } from '../project-list.service';
import {
  actionProjectsAddOne,
  actionProjectsAddOneError,
  actionProjectsAddOneSuccess,
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllError,
  actionProjectsRetrieveAllSuccess
} from './project-list.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';
import { Router } from '@angular/router';
import { navigation } from '../../../app-routing.module';

@Injectable()
export class ProjectListEffects {
  retrieveAll = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsRetrieveAll),
      exhaustMap(() =>
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

  addOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsAddOne),
      exhaustMap((action) =>
        this.projectListService.addProject(action.project).pipe(
          map(() => actionProjectsAddOneSuccess()),
          catchError((error) =>
            of(actionProjectsAddOneError({ message: error.message }))
          )
        )
      )
    )
  );

  addOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsAddOneSuccess),
        tap(() => {
          this.router.navigate([navigation.projets.path]).then(() => {
            this.notificationService.success('Projet ajouté');
          });
        })
      ),
    { dispatch: false }
  );

  addOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsAddOneError),
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
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
