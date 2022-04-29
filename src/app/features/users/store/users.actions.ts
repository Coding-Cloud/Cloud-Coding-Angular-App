import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

export const actionUsersSearchInit = createAction('[Users] Search Init');

export const actionUsersSearch = createAction(
  '[Users] Search users',
  props<{ search: string }>()
);

export const actionUsersSearchSuccess = createAction(
  '[Users] Search users success',
  props<{ users: User[] }>()
);

export const actionUsersSearchError = createAction(
  '[Users] Search users error',
  props<{ message: string }>()
);
