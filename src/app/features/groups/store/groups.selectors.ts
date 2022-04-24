import { groupAdapter } from './group-list.reducer';
import { createSelector } from '@ngrx/store';
import {
  selectCurrentGroupState,
  selectGroupsState
} from '../../../core/core.state';
import { GroupsState, GroupState } from '../../../shared/models/group.model';

const { selectEntities, selectAll, selectTotal } = groupAdapter.getSelectors();

export const selectOwnedGroups = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.ownedGroups
);
export const selectJoinedGroups = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.joinedGroups
);

export const selectCurrentGroup = createSelector(
  selectCurrentGroupState,
  (state: GroupState) => state.group
);

export const selectCurrentGroupIsEditMode = createSelector(
  selectCurrentGroupState,
  (state: GroupState) => state.editMode
);
export const selectCurrentGroupMembers = createSelector(
  selectCurrentGroupState,
  (state: GroupState) => state.members
);
export const selectCurrentGroupMessages = createSelector(
  selectCurrentGroupState,
  (state: GroupState) => state.messages
);

export const selectAllOwnedGroups = createSelector(
  selectOwnedGroups,
  selectAll
);
export const selectAllJoinedGroups = createSelector(
  selectJoinedGroups,
  selectAll
);
export const selectGroupsEntities = createSelector(
  selectOwnedGroups,
  selectEntities
);
export const selectGroupsCount = createSelector(selectOwnedGroups, selectTotal);
