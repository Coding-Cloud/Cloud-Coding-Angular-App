import { createAction, props } from '@ngrx/store';
import { Follower } from '../../../../shared/models/follower.model';

export const actionFollowersInit = createAction('[Followers] Followers Init');

export const actionFollowingsInit = createAction('[Followers] Followings Init');

export const actionFollowersGetFromUser = createAction(
  '[Followers] Get Followers from user',
  props<{ userId: string; limit: number; offset: number }>()
);

export const actionFollowingsGetFromUser = createAction(
  '[Followers] Get Followings from user',
  props<{ userId: string; limit: number; offset: number }>()
);

export const actionFollowersGetFromUserSuccess = createAction(
  '[Followers] Get Followers from user success',
  props<{ followers: Follower[]; totalResults: number }>()
);

export const actionFollowingsGetFromUserSuccess = createAction(
  '[Followers] Get Followings from user success',
  props<{ followings: Follower[]; totalResults: number }>()
);

export const actionFollowersGetFromUserError = createAction(
  '[Followers] Get Followers from user error',
  props<{ message: string }>()
);

export const actionFollowingsGetFromUserError = createAction(
  '[Followers] Get Followings from user error',
  props<{ message: string }>()
);
