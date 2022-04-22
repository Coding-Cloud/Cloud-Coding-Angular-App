import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../core/core.state';
import { ProjectsService } from '../projects.service';
import {
  actionProjectsAddOne,
  actionProjectsAddOneError,
  actionProjectsAddOneSuccess,
  actionProjectsDeleteOne,
  actionProjectsDeleteOneError,
  actionProjectsDeleteOneSuccess,
  actionProjectsGetOne,
  actionProjectsGetOneError,
  actionProjectsGetOneSuccess,
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllError,
  actionProjectsRetrieveAllSuccess,
  actionProjectsUpdateOne,
  actionProjectsUpdateOneError,
  actionProjectsUpdateOneSuccess
} from './projects.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';
import { Router } from '@angular/router';
import { navigation } from '../../../app-routing.module';

@Injectable()
export class ProjectsEffects {
  retrieveAll = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsRetrieveAll),
      exhaustMap(() =>
        this.projectListService.getProjects().pipe(
          map((projects) => actionProjectsRetrieveAllSuccess({ projects })),
          catchError((error) =>
            of(
              actionProjectsRetrieveAllError({
                message: error.message.toString()
              })
            )
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

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsGetOne),
      exhaustMap((action) =>
        this.projectListService.getProject(action.id).pipe(
          map((project) => actionProjectsGetOneSuccess({ project })),
          catchError((error) =>
            of(
              actionProjectsGetOneError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  getOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsGetOneError),
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

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsDeleteOne),
      exhaustMap((action) =>
        this.projectListService.deleteProject(action.id).pipe(
          map(() => actionProjectsDeleteOneSuccess()),
          catchError((error) =>
            of(actionProjectsDeleteOneError({ message: error.message }))
          )
        )
      )
    )
  );

  deleteOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsDeleteOneSuccess),
        tap(() => {
          this.router.navigate([navigation.projets.path]).then(() => {
            this.notificationService.success('Projet supprimé');
          });
        })
      ),
    { dispatch: false }
  );

  deleteOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsDeleteOneError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsUpdateOne),
      exhaustMap((action) =>
        this.projectListService.updateProject(action.id, action.project).pipe(
          map(() =>
            actionProjectsUpdateOneSuccess({
              id: action.id,
              project: action.project
            })
          ),
          catchError((error) =>
            of(actionProjectsUpdateOneError({ message: error.message }))
          )
        )
      )
    )
  );

  updateOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsUpdateOneSuccess),
        tap(() => {
          this.notificationService.success('Projet modifié');
        })
      ),
    { dispatch: false }
  );

  updateOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionProjectsUpdateOneError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private projectListService: ProjectsService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
