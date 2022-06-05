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

export const initialState: UserState = {
  user: emptyUser,
  isFollowing: false,
  projects: []
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
  }))
);

export function userViewReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return reducer(state, action);
}
