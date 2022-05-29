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
  actionProjectsGetOneGroupError,
  actionProjectsGetOneGroupSuccess,
  actionProjectsGetOneSuccess,
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllError,
  actionProjectsRetrieveAllSuccess,
  actionProjectsSearch,
  actionProjectsSearchDialog,
  actionProjectsSearchDialogError,
  actionProjectsSearchDialogSuccess,
  actionProjectsSearchError,
  actionProjectsSearchSuccess,
  actionProjectsUpdateOne,
  actionProjectsUpdateOneError,
  actionProjectsUpdateOneSuccess
} from './projects.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';
import { Router } from '@angular/router';
import { navigation } from '../../../app-routing.module';
import { GroupsService } from '../../groups/groups.service';

@Injectable()
export class ProjectsEffects {
  retrieveAll = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsRetrieveAll),
      exhaustMap(() =>
        this.projectsService.getProjects().pipe(
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

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsGetOne),
      exhaustMap((action) =>
        this.projectsService.getProject(action.id).pipe(
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

  getOneSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsGetOneSuccess),
      exhaustMap((action) =>
        this.groupsService.getGroup(action.project.groupId).pipe(
          map((group) => actionProjectsGetOneGroupSuccess({ group })),
          catchError((error) =>
            of(
              actionProjectsGetOneGroupError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  addOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsAddOne),
      exhaustMap((action) =>
        this.projectsService.addProject(action.project).pipe(
          map((projectId: string) =>
            actionProjectsAddOneSuccess({ projectId })
          ),
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
        tap((action: { projectId: string }) => {
          this.router.navigate([navigation.projets.path]).then(() => {
            this.notificationService.success('Projet ajouté');
          });
        })
      ),
    { dispatch: false }
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsDeleteOne),
      exhaustMap((action) =>
        this.projectsService.deleteProject(action.id).pipe(
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

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsUpdateOne),
      exhaustMap((action) =>
        this.projectsService.updateProject(action.id, action.project).pipe(
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

  searchDialog = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsSearchDialog),
      exhaustMap((action) =>
        this.projectsService.searchProjectsDialog(action.search).pipe(
          map((projects) =>
            actionProjectsSearchDialogSuccess({
              projects
            })
          ),
          catchError((error) =>
            of(actionProjectsSearchDialogError({ message: error.message }))
          )
        )
      )
    )
  );

  search = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProjectsSearch),
      exhaustMap((action) =>
        this.projectsService
          .searchProjects(
            action.page * action.limit,
            action.limit,
            action.search
          )
          .pipe(
            map(({ projects, totalResults }) =>
              actionProjectsSearchSuccess({
                projects,
                totalResults
              })
            ),
            catchError((error) =>
              of(actionProjectsSearchError({ message: error.message }))
            )
          )
      )
    )
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionProjectsDeleteOneError,
          actionProjectsRetrieveAllError,
          actionProjectsGetOneError,
          actionProjectsGetOneGroupError,
          actionProjectsAddOneError,
          actionProjectsUpdateOneError,
          actionProjectsSearchDialogError,
          actionProjectsSearchError
        ),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private projectsService: ProjectsService,
    private groupsService: GroupsService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
