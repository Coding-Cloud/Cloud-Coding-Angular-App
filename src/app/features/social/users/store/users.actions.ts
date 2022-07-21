import { createAction, props } from '@ngrx/store';
import { User } from '../../../../shared/models/user.model';
import { Project } from '../../../../shared/models/project.model';

export const actionUsersSearchInit = createAction('[Users] Search Init');

export const actionUsersSearchDialog = createAction(
  '[Users] Search users dialog',
  props<{ search: string }>()
);

export const actionUsersSearchDialogSuccess = createAction(
  '[Users] Search users dialog success',
  props<{ users: User[] }>()
);

export const actionUsersSearchDialogError = createAction(
  '[Users] Search users dialog error',
  props<{ message: string }>()
);

export const actionUsersSearch = createAction(
  '[Users] Search users',
  props<{ search?: string; limit: number; page: number }>()
);

export const actionUsersSearchSuccess = createAction(
  '[Users] Search users success',
  props<{ users: User[]; totalResults: number }>()
);

export const actionUsersSearchError = createAction(
  '[Users] Search users error',
  props<{ message: string }>()
);

export const actionUsersGetOne = createAction(
  '[Users] Get One',
  props<{ id: string }>()
);

export const actionUsersGetOneSuccess = createAction(
  '[Users] Get One Success',
  props<{ user: User }>()
);

export const actionUsersGetOneError = createAction(
  '[Users] Get One Error',
  props<{ message: string }>()
);

export const actionUsersGetUserProjects = createAction(
  "[Users] Get user's projects",
  props<{ id: string }>()
);

export const actionUsersGetUserProjectsSuccess = createAction(
  "[Users] Get user's projects Success",
  props<{ projects: Project[] }>()
);

export const actionUsersGetUserProjectsError = createAction(
  "[Users] Get user's projects Error",
  props<{ message: string }>()
);
