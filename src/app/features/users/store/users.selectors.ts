import { userSearchAdapter } from './user-search.reducer';
import { UsersState } from '../../../shared/models/user.model';
import { createSelector } from '@ngrx/store';
import { selectUsersSearchState } from '../../../core/core.state';

const userSearchSelector = userSearchAdapter.getSelectors();

export const selectUsersSearch = createSelector(
  selectUsersSearchState,
  (state: UsersState) => state
);

export const selectAllUsersSearch = createSelector(
  selectUsersSearch,
  userSearchSelector.selectAll
);
