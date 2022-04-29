import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  actionGroupsAddMembership,
  actionGroupsAddMembershipError,
  actionGroupsAddMembershipSuccess,
  actionGroupsAddOne,
  actionGroupsAddOneError,
  actionGroupsAddOneSuccess,
  actionGroupsAddProject,
  actionGroupsAddProjectError,
  actionGroupsAddProjectSuccess,
  actionGroupsDeleteOneError,
  actionGroupsDeleteOneOwned,
  actionGroupsDeleteOneSuccess,
  actionGroupsGetMemberSuccess,
  actionGroupsGetOne,
  actionGroupsGetOneError,
  actionGroupsGetOneProjectsError,
  actionGroupsGetOneProjectsSuccess,
  actionGroupsGetOneSuccess,
  actionGroupsRetrieveAllJoined,
  actionGroupsRetrieveAllJoinedError,
  actionGroupsRetrieveAllJoinedSuccess,
  actionGroupsRetrieveAllOwned,
  actionGroupsRetrieveAllOwnedError,
  actionGroupsRetrieveAllOwnedSuccess,
  actionGroupsUpdateMembership,
  actionGroupsUpdateMembershipError,
  actionGroupsUpdateMembershipSuccess,
  actionGroupsUpdateOneError,
  actionGroupsUpdateOneOwned,
  actionGroupsUpdateOneOwnedSuccess
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
  retrieveAllOwned = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsRetrieveAllOwned),
      exhaustMap(() =>
        this.groupsService.getOwnedGroups().pipe(
          map((groups) => actionGroupsRetrieveAllOwnedSuccess({ groups })),
          catchError((error) =>
            of(
              actionGroupsRetrieveAllOwnedError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  retrieveAllJoined = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsRetrieveAllJoined),
      exhaustMap(() =>
        this.groupsService.getJoinedGroups().pipe(
          map((groups) => actionGroupsRetrieveAllJoinedSuccess({ groups })),
          catchError((error) =>
            of(
              actionGroupsRetrieveAllJoinedError({
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

  updateMembership = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsUpdateMembership),
      exhaustMap((action) =>
        this.groupsService.updateGroupMembership(action.groupMembership).pipe(
          map(() =>
            actionGroupsUpdateMembershipSuccess({
              groupMembership: action.groupMembership
            })
          ),
          catchError((error) =>
            of(actionGroupsUpdateMembershipError({ message: error.message }))
          )
        )
      )
    )
  );

  updateMembershipSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsUpdateMembershipSuccess),
        tap(() => {
          this.notificationService.success('Membre mis à jour');
        })
      ),
    { dispatch: false }
  );

  addMembership = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsAddMembership),
      exhaustMap((action) =>
        this.groupsService.addGroupMembership(action.groupMembership).pipe(
          map(() =>
            actionGroupsAddMembershipSuccess({
              groupMembership: action.groupMembership
            })
          ),
          catchError((error) =>
            of(actionGroupsAddMembershipError({ message: error.message }))
          )
        )
      )
    )
  );

  addMembershipSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsAddMembershipSuccess),
        tap(() => {
          this.notificationService.success('Membre ajouté');
        })
      ),
    { dispatch: false }
  );

  addProject = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsAddProject),
      exhaustMap((action) =>
        this.projectsService
          .updateProjectGroup(action.project.id, action.project.groupId)
          .pipe(
            map(() =>
              actionGroupsAddProjectSuccess({
                project: action.project
              })
            ),
            catchError((error) =>
              of(actionGroupsAddProjectError({ message: error.message }))
            )
          )
      )
    )
  );

  addProjectSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGroupsAddProjectSuccess),
        tap(() => {
          this.notificationService.success('Projet ajouté');
        })
      ),
    { dispatch: false }
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsDeleteOneOwned),
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

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGroupsUpdateOneOwned),
      exhaustMap((action) =>
        this.groupsService.updateGroup(action.id, action.group).pipe(
          map(() =>
            actionGroupsUpdateOneOwnedSuccess({
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
        ofType(actionGroupsUpdateOneOwnedSuccess),
        tap(() => {
          this.notificationService.success('Groupe modifié');
        })
      ),
    { dispatch: false }
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionGroupsUpdateOneError,
          actionGroupsRetrieveAllOwnedError,
          actionGroupsGetOneError,
          actionGroupsGetOneProjectsError,
          actionGroupsRetrieveAllJoinedError,
          actionGroupsAddOneError,
          actionGroupsDeleteOneError,
          actionGroupsUpdateMembershipError,
          actionGroupsAddMembershipError,
          actionGroupsAddProjectError
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
    private groupsService: GroupsService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
