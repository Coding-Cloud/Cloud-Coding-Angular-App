import { createAction, props } from '@ngrx/store';
import { Friendship } from '../../../../shared/models/friendship.model';

export const actionFriendshipsRetrieveAll = createAction(
  '[Friendships] Retrieve All'
);

export const actionFriendshipsRetrieveAllSuccess = createAction(
  '[Friendships] Retrieve All Success',
  props<{ friendships: Friendship[] }>()
);

export const actionFriendshipsRetrieveAllError = createAction(
  '[Friendships] Retrieve All Error',
  props<{ message: string }>()
);

export const actionFriendshipsGetOne = createAction(
  '[Friendships] Get One',
  props<{ userId: string }>()
);

export const actionFriendshipsGetOneSuccess = createAction(
  '[Friendships] Get One Success',
  props<{ friendship: Friendship | null }>()
);

export const actionFriendshipsGetOneError = createAction(
  '[Friendships] Get One Error',
  props<{ message: string }>()
);

export const actionFriendshipsRemoveOne = createAction(
  '[Friendships] Remove One',
  props<{ friendshipId: string }>()
);

export const actionFriendshipsRemoveOneSuccess = createAction(
  '[Friendships] Remove One Success',
  props<{ friendshipId: string }>()
);

export const actionFriendshipsRemoveOneError = createAction(
  '[Friendships] Remove One Error',
  props<{ message: string }>()
);
