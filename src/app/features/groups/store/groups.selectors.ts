import { groupAdapter } from './group-list.reducer';
import { createSelector } from '@ngrx/store';
import {
  selectCurrentGroupState,
  selectGroupsState
} from '../../../core/core.state';
import { GroupsState, GroupState } from '../../../shared/models/group.model';

const { selectEntities, selectAll, selectTotal } = groupAdapter.getSelectors();

export const selectGroups = createSelector(
  selectGroupsState,
  (state: GroupsState) => state
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

export const selectAllGroups = createSelector(selectGroups, selectAll);
export const selectGroupsEntities = createSelector(
  selectGroups,
  selectEntities
);
export const selectGroupsCount = createSelector(selectGroups, selectTotal);
