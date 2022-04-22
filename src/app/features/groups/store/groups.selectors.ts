import { groupAdapter } from './group-list.reducer';
import { createSelector } from '@ngrx/store';
import { selectGroupsState } from '../../../core/core.state';
import { GroupsState } from '../../../shared/models/group.model';

const { selectEntities, selectAll, selectTotal } = groupAdapter.getSelectors();

export const selectGroups = createSelector(
  selectGroupsState,
  (state: GroupsState) => state
);

/*
export const selectCurrentGroup = createSelector(
  selectCurrentGroupState,
  (state: GroupState) => state.group
);

export const selectCurrentGroupIsEditMode = createSelector(
  selectCurrentGroupState,
  (state: GroupState) => state.editMode
);
*/

export const selectAllGroups = createSelector(selectGroups, selectAll);
export const selectGroupsEntities = createSelector(
  selectGroups,
  selectEntities
);
export const selectGroupsCount = createSelector(selectGroups, selectTotal);
