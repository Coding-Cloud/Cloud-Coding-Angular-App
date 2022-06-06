import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { getTime } from 'date-fns';
import {
  FriendRequest,
  FriendRequestsState
} from '../../../../shared/models/friendship.model';
import {
  actionFriendRequestsAcceptSuccess,
  actionFriendRequestsCancelSuccess,
  actionFriendRequestsRejectSuccess,
  actionFriendRequestsRetrieveAll,
  actionFriendRequestsRetrieveAllReceivedError,
  actionFriendRequestsRetrieveAllReceivedSuccess,
  actionFriendRequestsRetrieveAllSentError,
  actionFriendRequestsRetrieveAllSentSuccess
} from './friend-requests.actions';

function sortByDate(a: FriendRequest, b: FriendRequest): number {
  return getTime(a.createdAt) - getTime(b.createdAt);
}

export const friendRequestsReceivedAdapter: EntityAdapter<FriendRequest> =
  createEntityAdapter<FriendRequest>({
    selectId: (request: FriendRequest) => request.requesterUserId,
    sortComparer: sortByDate
  });

export const friendRequestsSentAdapter: EntityAdapter<FriendRequest> =
  createEntityAdapter<FriendRequest>({
    selectId: (request: FriendRequest) => request.requestedUserId,
    sortComparer: sortByDate
  });

const initialState: FriendRequestsState = {
  sentFriendRequests: friendRequestsSentAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  sentFriendRequestsLoading: false,
  receivedFriendRequests: friendRequestsReceivedAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  receivedFriendRequestsLoading: false
};

const reducer = createReducer(
  initialState,
  on(actionFriendRequestsRetrieveAll, (_state) => ({
    ...initialState,
    sendFriendRequestsLoading: true,
    receivedFriendRequestsLoading: true
  })),
  on(
    actionFriendRequestsRetrieveAllReceivedSuccess,
    (state, { friendRequests }) => ({
      ...state,
      receivedFriendRequests: friendRequestsReceivedAdapter.setAll(
        friendRequests,
        state.receivedFriendRequests
      ),
      receivedFriendRequestsLoading: false
    })
  ),
  on(
    actionFriendRequestsRetrieveAllSentSuccess,
    (state, { friendRequests }) => ({
      ...state,
      sentFriendRequests: friendRequestsSentAdapter.setAll(
        friendRequests,
        state.sentFriendRequests
      ),
      sentFriendRequestsLoading: false
    })
  ),
  on(actionFriendRequestsRetrieveAllReceivedError, (state) => ({
    ...state,
    receivedFriendRequestsLoading: false
  })),
  on(actionFriendRequestsRetrieveAllSentError, (state) => ({
    ...state,
    sentFriendRequestsLoading: false
  })),
  on(actionFriendRequestsCancelSuccess, (state, { userId }) => ({
    ...state,
    sentFriendRequests: friendRequestsSentAdapter.removeOne(
      userId,
      state.sentFriendRequests
    )
  })),
  on(actionFriendRequestsRejectSuccess, (state, { userId }) => ({
    ...state,
    receivedFriendRequests: friendRequestsReceivedAdapter.removeOne(
      userId,
      state.receivedFriendRequests
    )
  })),
  on(actionFriendRequestsAcceptSuccess, (state, { friendship }) => ({
    ...state,
    receivedFriendRequests: friendRequestsReceivedAdapter.removeMany(
      [friendship.user1Id, friendship.user2Id],
      state.receivedFriendRequests
    )
  }))
);

export function friendRequestsReducer(
  state: FriendRequestsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
