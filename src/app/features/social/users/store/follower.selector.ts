import { followerAdapter, followingAdapter } from './follower.reducer';
import { createSelector } from '@ngrx/store';
import { selectFollowersState } from '../../../../core/core.state';

const followerSelector = followerAdapter.getSelectors();
const followingSelector = followingAdapter.getSelectors();

export const selectFollowers = createSelector(
  selectFollowersState,
  (state) => state.followers
);

export const selectFollowings = createSelector(
  selectFollowersState,
  (state) => state.followings
);

export const selectAllFollowers = createSelector(
  selectFollowers,
  followerSelector.selectAll
);

export const selectAllFollowings = createSelector(
  selectFollowings,
  followingSelector.selectAll
);

export const selectFollowersLoading = createSelector(
  selectFollowersState,
  (state) => state.followerLoading
);

export const selectFollowingsLoading = createSelector(
  selectFollowersState,
  (state) => state.followingLoading
);

export const selectFollowersTotalResults = createSelector(
  selectFollowersState,
  (state) => state.followerTotalResults
);

export const selectFollowingsTotalResults = createSelector(
  selectFollowersState,
  (state) => state.followingTotalResults
);
