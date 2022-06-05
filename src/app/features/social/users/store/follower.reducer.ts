import {
  Follower,
  FollowersState
} from '../../../../shared/models/follower.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionFollowersFollowSuccess,
  actionFollowersGetFromUser,
  actionFollowersGetFromUserError,
  actionFollowersGetFromUserSuccess,
  actionFollowersInit,
  actionFollowersUnfollowSuccess,
  actionFollowingsGetFromUser,
  actionFollowingsGetFromUserError,
  actionFollowingsGetFromUserSuccess,
  actionFollowingsInit
} from './follower.actions';

function sortByDate(a: Follower, b: Follower): number {
  return a.createdAt.getTime() - b.createdAt.getTime();
}

export const followerAdapter: EntityAdapter<Follower> =
  createEntityAdapter<Follower>({
    selectId: (follower: Follower) => follower.followerId,
    sortComparer: sortByDate
  });

export const followingAdapter: EntityAdapter<Follower> =
  createEntityAdapter<Follower>({
    selectId: (follower: Follower) => follower.followingId,
    sortComparer: sortByDate
  });

const initialState: FollowersState = {
  followers: followerAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  followerTotalResults: 0,
  followerLoading: false,
  followings: followingAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  followingTotalResults: 0,
  followingLoading: false
};

const reducer = createReducer(
  initialState,
  on(actionFollowersInit, (state) => ({
    ...state,
    followers: followerAdapter.removeAll(state.followers),
    followerTotalResults: 0,
    followerLoading: false
  })),
  on(actionFollowingsInit, (state) => ({
    ...state,
    followings: followingAdapter.removeAll(state.followings),
    followingTotalResults: 0,
    followingLoading: false
  })),
  on(actionFollowersGetFromUser, (state) => ({
    ...state,
    followerLoading: true
  })),
  on(actionFollowingsGetFromUser, (state) => ({
    ...state,
    followingLoading: true
  })),
  on(actionFollowersGetFromUserError, (state) => ({
    ...state,
    followerLoading: false
  })),
  on(actionFollowingsGetFromUserError, (state) => ({
    ...state,
    followingLoading: false
  })),
  on(actionFollowersGetFromUserSuccess, (state, payload) => ({
    ...state,
    followers: followerAdapter.setAll(payload.followers, state.followers),
    followerTotalResults: payload.totalResults,
    followerLoading: false
  })),
  on(actionFollowingsGetFromUserSuccess, (state, payload) => ({
    ...state,
    followings: followingAdapter.setAll(payload.followings, state.followings),
    followingTotalResults: payload.totalResults,
    followingLoading: false
  })),
  on(actionFollowersFollowSuccess, (state, payload) => ({
    ...state,
    followings: followingAdapter.addOne(payload.follower, state.followings),
    followingTotalResults: state.followingTotalResults + 1
  })),
  on(actionFollowersUnfollowSuccess, (state, payload) => ({
    ...state,
    followings: followingAdapter.removeOne(payload.userId, state.followings),
    followingTotalResults: state.followingTotalResults - 1
  }))
);

export function followersReducer(
  state: FollowersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
