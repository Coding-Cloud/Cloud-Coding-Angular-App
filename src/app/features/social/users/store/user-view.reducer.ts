import { Action, createReducer, on } from '@ngrx/store';
import { emptyUser, UserState } from '../../../../shared/models/user.model';
import {
  actionUsersGetOne,
  actionUsersGetOneSuccess,
  actionUsersGetUserProjectsSuccess
} from './users.actions';
import {
  actionFollowersFollowSuccess,
  actionFollowersIsFollowingSuccess,
  actionFollowersUnfollowSuccess
} from './follower.actions';
import {
  actionFriendRequestsAcceptSuccess,
  actionFriendRequestsCancelSuccess,
  actionFriendRequestsRejectSuccess,
  actionFriendRequestsRetrieveOneSuccess,
  actionFriendRequestsSendSuccess
} from '../../friendships/store/friend-requests.actions';
import {
  actionFriendshipsGetOneSuccess,
  actionFriendshipsRemoveOneSuccess
} from '../../friendships/store/friendships.actions';

export const initialState: UserState = {
  user: emptyUser,
  isFollowing: false,
  projects: [],
  friendship: null,
  friendRequest: null
};

const reducer = createReducer(
  initialState,
  on(actionUsersGetOne, (_state) => ({ ...initialState })),
  on(actionUsersGetOneSuccess, (state, { user }) => ({
    ...state,
    user
  })),
  on(actionUsersGetUserProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects
  })),
  on(actionFollowersIsFollowingSuccess, (state, { isFollowing }) => ({
    ...state,
    isFollowing
  })),
  on(actionFollowersFollowSuccess, (state) => ({
    ...state,
    isFollowing: true
  })),
  on(actionFollowersUnfollowSuccess, (state) => ({
    ...state,
    isFollowing: false
  })),
  on(
    actionFriendRequestsCancelSuccess,
    actionFriendRequestsRejectSuccess,
    (state) => ({
      ...state,
      friendRequest: null
    })
  ),
  on(actionFriendRequestsAcceptSuccess, (state, { friendship }) => ({
    ...state,
    friendRequest: null,
    friendship
  })),
  on(
    actionFriendRequestsSendSuccess,
    actionFriendRequestsRetrieveOneSuccess,
    (state, { friendRequest }) => ({
      ...state,
      friendRequest
    })
  ),
  on(actionFriendshipsGetOneSuccess, (state, { friendship }) => ({
    ...state,
    friendship
  })),
  on(actionFriendshipsRemoveOneSuccess, (state) => ({
    ...state,
    friendship: null
  }))
);

export function userViewReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return reducer(state, action);
}
