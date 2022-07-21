import { createAction, props } from '@ngrx/store';
import {
  FriendRequest,
  Friendship
} from '../../../../shared/models/friendship.model';

export const actionFriendRequestsRetrieveAll = createAction(
  '[Friend Requests] Retrieve All'
);

export const actionFriendRequestsRetrieveAllReceivedSuccess = createAction(
  '[Friend Requests] Retrieve All Received Success',
  props<{ friendRequests: FriendRequest[] }>()
);

export const actionFriendRequestsRetrieveAllReceivedError = createAction(
  '[Friend Requests] Retrieve All Received Error',
  props<{ message: string }>()
);

export const actionFriendRequestsRetrieveAllSentSuccess = createAction(
  '[Friend Requests] Retrieve All Sent Success',
  props<{ friendRequests: FriendRequest[] }>()
);

export const actionFriendRequestsRetrieveAllSentError = createAction(
  '[Friend Requests] Retrieve All Sent Error',
  props<{ message: string }>()
);

export const actionFriendRequestsCancel = createAction(
  '[Friend Requests] Cancel',
  props<{ userId: string }>()
);

export const actionFriendRequestsCancelSuccess = createAction(
  '[Friend Requests] Cancel Success',
  props<{ userId: string }>()
);

export const actionFriendRequestsCancelError = createAction(
  '[Friend Requests] Cancel Error',
  props<{ message: string }>()
);

export const actionFriendRequestsReject = createAction(
  '[Friend Requests] Reject',
  props<{ userId: string }>()
);

export const actionFriendRequestsRejectSuccess = createAction(
  '[Friend Requests] Reject Success',
  props<{ userId: string }>()
);

export const actionFriendRequestsRejectError = createAction(
  '[Friend Requests] Reject Error',
  props<{ message: string }>()
);

export const actionFriendRequestsAccept = createAction(
  '[Friend Requests] Accept',
  props<{ userId: string }>()
);

export const actionFriendRequestsAcceptSuccess = createAction(
  '[Friend Requests] Accept Success',
  props<{ friendship: Friendship }>()
);

export const actionFriendRequestsAcceptError = createAction(
  '[Friend Requests] Accept Error',
  props<{ message: string }>()
);

export const actionFriendRequestsSend = createAction(
  '[Friend Requests] Send',
  props<{ userId: string }>()
);

export const actionFriendRequestsSendSuccess = createAction(
  '[Friend Requests] Send Success',
  props<{ friendRequest: FriendRequest }>()
);

export const actionFriendRequestsSendError = createAction(
  '[Friend Requests] Send Error',
  props<{ message: string }>()
);

export const actionFriendRequestsRetrieveOne = createAction(
  '[Friend Requests] Retrieve One',
  props<{ userId: string }>()
);

export const actionFriendRequestsRetrieveOneSuccess = createAction(
  '[Friend Requests] Retrieve One Success',
  props<{ friendRequest: FriendRequest | null }>()
);

export const actionFriendRequestsRetrieveOneError = createAction(
  '[Friend Requests] Retrieve One Error',
  props<{ message: string }>()
);
