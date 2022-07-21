import { Group, GroupsState } from '../../../shared/models/group.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionGroupsDeleteOneJoined,
  actionGroupsDeleteOneOwned,
  actionGroupsRetrieveAllJoined,
  actionGroupsRetrieveAllJoinedSuccess,
  actionGroupsRetrieveAllOwned,
  actionGroupsRetrieveAllOwnedSuccess,
  actionGroupsUpdateOneJoinedSuccess,
  actionGroupsUpdateOneOwnedSuccess,
  actionGroupsUpsertOneJoined,
  actionGroupsUpsertOneOwned
} from './groups.actions';

export function sortByTitle(a: Group, b: Group): number {
  return a.name.localeCompare(b.name);
}

export const groupAdapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  sortComparer: sortByTitle
});

export const initialState: GroupsState = {
  joinedGroups: {
    ids: [],
    entities: {}
  },
  ownedGroups: {
    ids: [],
    entities: {}
  }
};

const reducer = createReducer(
  initialState,
  on(actionGroupsUpsertOneOwned, (state, { group }) => ({
    ...state,
    ownedGroups: groupAdapter.upsertOne(group, state.ownedGroups)
  })),
  on(actionGroupsDeleteOneOwned, (state, action) => ({
    ...state,
    ownedGroups: groupAdapter.removeOne(action.id, state.ownedGroups)
  })),
  on(actionGroupsRetrieveAllOwned, (state) => ({
    ...state,
    ownedGroups: groupAdapter.removeAll(state.ownedGroups)
  })),
  on(actionGroupsRetrieveAllOwnedSuccess, (state, { groups }) => ({
    ...state,
    ownedGroups: groupAdapter.addMany(groups, state.ownedGroups)
  })),
  on(actionGroupsUpdateOneOwnedSuccess, (state, action) => ({
    ...state,
    ownedGroups: groupAdapter.updateOne(
      {
        id: action.id,
        changes: { ...action.group }
      },
      state.ownedGroups
    )
  })),
  on(actionGroupsUpsertOneJoined, (state, { group }) => ({
    ...state,
    joinedGroups: groupAdapter.upsertOne(group, state.joinedGroups)
  })),
  on(actionGroupsDeleteOneJoined, (state, action) => ({
    ...state,
    joinedGroups: groupAdapter.removeOne(action.id, state.joinedGroups)
  })),
  on(actionGroupsRetrieveAllJoined, (state) => ({
    ...state,
    joinedGroups: groupAdapter.removeAll(state.joinedGroups)
  })),
  on(actionGroupsRetrieveAllJoinedSuccess, (state, { groups }) => ({
    ...state,
    joinedGroups: groupAdapter.addMany(groups, state.joinedGroups)
  })),
  on(actionGroupsUpdateOneJoinedSuccess, (state, action) => ({
    ...state,
    joinedGroups: groupAdapter.updateOne(
      {
        id: action.id,
        changes: { ...action.group }
      },
      state.joinedGroups
    )
  }))
);

export function groupListReducer(
  state: GroupsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
