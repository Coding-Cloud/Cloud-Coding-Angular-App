import { createSelector } from '@ngrx/store';
import { selectFriendRequestsState } from '../../../../core/core.state';
import {
  friendRequestsReceivedAdapter,
  friendRequestsSentAdapter
} from './friend-requests.reducer';
import { FriendRequestsState } from '../../../../shared/models/friendship.model';

const sentFriendRequestsSelector = friendRequestsSentAdapter.getSelectors();
const receivedFriendRequestsSelector =
  friendRequestsReceivedAdapter.getSelectors();

export const selectReceivedFriendRequests = createSelector(
  selectFriendRequestsState,
  (state: FriendRequestsState) => state.receivedFriendRequests
);

export const selectReceivedFriendRequestsLoading = createSelector(
  selectFriendRequestsState,
  (state: FriendRequestsState) => state.receivedFriendRequestsLoading
);

export const selectAllReceivedFriendRequests = createSelector(
  selectReceivedFriendRequests,
  receivedFriendRequestsSelector.selectAll
);

export const selectReceivedFriendRequestsCount = createSelector(
  selectReceivedFriendRequests,
  receivedFriendRequestsSelector.selectTotal
);

export const selectSentFriendRequests = createSelector(
  selectFriendRequestsState,
  (state: FriendRequestsState) => state.sentFriendRequests
);

export const selectSentFriendRequestsLoading = createSelector(
  selectFriendRequestsState,
  (state: FriendRequestsState) => state.sentFriendRequestsLoading
);

export const selectAllSentFriendRequests = createSelector(
  selectSentFriendRequests,
  sentFriendRequestsSelector.selectAll
);

export const selectSentFriendRequestsCount = createSelector(
  selectSentFriendRequests,
  sentFriendRequestsSelector.selectTotal
);
