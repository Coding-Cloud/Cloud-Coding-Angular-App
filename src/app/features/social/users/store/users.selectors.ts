import { userSearchAdapter } from './user-search.reducer';
import { UsersState, UserState } from '../../../../shared/models/user.model';
import { createSelector } from '@ngrx/store';
import {
  selectUsersSearchState,
  selectUserViewState
} from '../../../../core/core.state';

const userSearchSelector = userSearchAdapter.getSelectors();

export const selectUsersSearch = createSelector(
  selectUsersSearchState,
  (state: UsersState) => state.users
);

export const selectUsersSearchTotalResults = createSelector(
  selectUsersSearchState,
  (state: UsersState) => state.totalResults
);

export const selectUsersSearchLoading = createSelector(
  selectUsersSearchState,
  (state: UsersState) => state.loading
);

export const selectUserView = createSelector(
  selectUserViewState,
  (state: UserState) => state.user
);

export const selectUserViewProjects = createSelector(
  selectUserViewState,
  (state: UserState) => state.projects
);

export const selectUserViewFollowing = createSelector(
  selectUserViewState,
  (state: UserState) => state.isFollowing
);

export const selectUserViewFriendship = createSelector(
  selectUserViewState,
  (state: UserState) => state.friendship
);

export const selectUserViewFriendRequest = createSelector(
  selectUserViewState,
  (state: UserState) => state.friendRequest
);

export const selectAllUsersSearch = createSelector(
  selectUsersSearch,
  userSearchSelector.selectAll
);
