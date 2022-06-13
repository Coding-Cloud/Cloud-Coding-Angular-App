import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { getTime } from 'date-fns';
import {
  Friendship,
  FriendshipsState
} from '../../../../shared/models/friendship.model';
import {
  actionFriendshipsRemoveOneSuccess,
  actionFriendshipsRetrieveAll,
  actionFriendshipsRetrieveAllError,
  actionFriendshipsRetrieveAllSuccess
} from './friendships.actions';
import { actionFriendRequestsAcceptSuccess } from './friend-requests.actions';

function sortByDate(a: Friendship, b: Friendship): number {
  return getTime(new Date(a.createdAt)) - getTime(new Date(b.createdAt));
}

export const friendshipsAdapter: EntityAdapter<Friendship> =
  createEntityAdapter<Friendship>({
    sortComparer: sortByDate
  });

const initialState: FriendshipsState = {
  friendships: friendshipsAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  loading: false
};

const reducer = createReducer(
  initialState,
  on(actionFriendshipsRetrieveAll, (_state) => ({
    ...initialState,
    loading: true
  })),
  on(actionFriendshipsRetrieveAllSuccess, (state, { friendships }) => ({
    ...state,
    friendships: friendshipsAdapter.setAll(friendships, state.friendships),
    loading: false
  })),
  on(actionFriendshipsRetrieveAllError, (state) => ({
    ...state,
    loading: false
  })),
  on(actionFriendshipsRemoveOneSuccess, (state, { friendshipId }) => ({
    ...state,
    friendships: friendshipsAdapter.removeOne(friendshipId, state.friendships)
  })),
  on(actionFriendRequestsAcceptSuccess, (state, { friendship }) => ({
    ...state,
    friendships: friendshipsAdapter.addOne(friendship, state.friendships)
  }))
);

export function friendshipsReducer(
  state: FriendshipsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
