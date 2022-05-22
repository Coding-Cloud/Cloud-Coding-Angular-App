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
  (state: UsersState) => state
);

export const selectUserView = createSelector(
  selectUserViewState,
  (state: UserState) => state.user
);

export const selectUserViewProjects = createSelector(
  selectUserViewState,
  (state: UserState) => state.projects
);

export const selectAllUsersSearch = createSelector(
  selectUsersSearch,
  userSearchSelector.selectAll
);
