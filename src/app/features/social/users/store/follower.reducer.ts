import {
  Follower,
  FollowersState
} from '../../../../shared/models/follower.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

function sortByDate(a: Follower, b: Follower): number {
  return a.createdAt.getTime() - b.createdAt.getTime();
}

export const followerAdapter: EntityAdapter<Follower> =
  createEntityAdapter<Follower>({
    sortComparer: sortByDate
  });

const initialState: FollowersState = {
  followers: followerAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  followerTotalResults: 0,
  followerLoading: false,
  followings: followerAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  followingTotalResults: 0,
  followingLoading: false
};

const reducer = createReducer(initialState);

export function followersReducer(
  state: FollowersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
