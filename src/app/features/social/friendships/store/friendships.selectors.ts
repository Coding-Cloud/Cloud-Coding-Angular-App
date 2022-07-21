import { friendshipsAdapter } from './friendships.reducer';
import { createSelector } from '@ngrx/store';
import { selectFriendshipsState } from '../../../../core/core.state';
import { FriendshipsState } from '../../../../shared/models/friendship.model';

const friendshipSelector = friendshipsAdapter.getSelectors();

export const selectFriendships = createSelector(
  selectFriendshipsState,
  (state: FriendshipsState) => state.friendships
);

export const selectFriendshipsLoading = createSelector(
  selectFriendshipsState,
  (state: FriendshipsState) => state.loading
);

export const selectAllFriendships = createSelector(
  selectFriendships,
  friendshipSelector.selectAll
);

export const selectFriendshipsCount = createSelector(
  selectFriendships,
  friendshipSelector.selectTotal
);
