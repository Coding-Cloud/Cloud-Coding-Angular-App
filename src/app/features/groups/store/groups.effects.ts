import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  actionGroupsAddOne,
  actionGroupsAddOneError,
  actionGroupsAddOneSuccess,
  actionGroupsDeleteOne,
  actionGroupsDeleteOneError,
  actionGroupsDeleteOneSuccess,
  actionGroupsGetMember,
  actionGroupsGetMemberError,
  actionGroupsGetMemberSuccess,
  actionGroupsGetOne,
  actionGroupsGetOneError,
  actionGroupsGetOneProjectsError,
  actionGroupsGetOneProjectsSuccess,
  actionGroupsGetOneSuccess,
  actionGroupsRetrieveAll,
  actionGroupsRetrieveAllError,
  actionGroupsRetrieveAllSuccess,
  actionGroupsUpdateOne,
  actionGroupsUpdateOneError,
  actionGroupsUpdateOneSuccess
} from './groups.actions';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { navigation } from '../../../app-routing.module';
import { of } from 'rxjs';
import { AppState } from '../../../core/core.state';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ProjectsService } from '../../projects/projects.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GroupsEffects {
  retrieveAll = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsRetrieveAll),
      exhaustMap(() =>
        this.groupsService.getGroups().pipe(
          map((groups) => actionGroupsRetrieveAllSuccess({ groups })),
          catchError((error) =>
            of(
              actionGroupsRetrieveAllError({
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
        ofType(actionGroupsRetrieveAllError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsGetOne),
      exhaustMap((action) =>
        this.groupsService.getGroup(action.id).pipe(
          map((group) => actionGroupsGetOneSuccess({ group })),
          catchError((error) =>
            of(
              actionGroupsGetOneError({
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
        ofType(actionGroupsGetOneError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  getOneProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsGetOne),
      exhaustMap((action) =>
        this.projectsService.getProjectsByGroupId(action.id).pipe(
          map((projects) => actionGroupsGetOneProjectsSuccess({ projects })),
          catchError((error) =>
            of(
              actionGroupsGetOneProjectsError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  getOneMembers = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsGetOne),
      exhaustMap((action) =>
        this.groupsService.getGroupMemberships(action.id).pipe(
          switchMap((memberships) =>
            memberships.map((membership) =>
              actionGroupsGetMemberSuccess({
                member: {
                  userId: membership.userId,
                  canEdit: membership.canEdit,
                  groupId: membership.groupId
                }
              })
            )
          ),
          catchError((error) =>
            of(
              actionGroupsGetOneProjectsError({
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
      ofType(actionGroupsGetOneSuccess),
      map((action) =>
        actionGroupsGetMemberSuccess({
          member: {
            userId: action.group.ownerId,
            canEdit: true,
            groupId: action.group.id
          }
        })
      )
    )
  );

  getOneProjectsError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsGetOneProjectsError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  addOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsAddOne),
      exhaustMap((action) =>
        this.groupsService.addGroup(action.group).pipe(
          map(() => actionGroupsAddOneSuccess()),
          catchError((error) =>
            of(actionGroupsAddOneError({ message: error.message }))
          )
        )
      )
    )
  );

  addOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsAddOneSuccess),
        tap(() => {
          this.router.navigate([navigation.groups.path]).then(() => {
            this.notificationService.success('Groupe ajouté');
          });
        })
      ),
    { dispatch: false }
  );

  addOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsAddOneError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsDeleteOne),
      exhaustMap((action) =>
        this.groupsService.deleteGroup(action.id).pipe(
          map(() => actionGroupsDeleteOneSuccess()),
          catchError((error) =>
            of(actionGroupsDeleteOneError({ message: error.message }))
          )
        )
      )
    )
  );

  deleteOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsDeleteOneSuccess),
        tap(() => {
          this.router.navigate([navigation.groups.path]).then(() => {
            this.notificationService.success('Groupe supprimé');
          });
        })
      ),
    { dispatch: false }
  );

  deleteOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsDeleteOneError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsUpdateOne),
      exhaustMap((action) =>
        this.groupsService.updateGroup(action.id, action.group).pipe(
          map(() =>
            actionGroupsUpdateOneSuccess({
              id: action.id,
              group: action.group
            })
          ),
          catchError((error) =>
            of(actionGroupsUpdateOneError({ message: error.message }))
          )
        )
      )
    )
  );

  updateOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsUpdateOneSuccess),
        tap(() => {
          this.notificationService.success('Groupe modifié');
        })
      ),
    { dispatch: false }
  );

  updateOneError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsUpdateOneError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private groupsService: GroupsService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
