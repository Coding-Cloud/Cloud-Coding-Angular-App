import { Group, GroupsState } from '../../../shared/models/group.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionGroupsDeleteOne,
  actionGroupsRetrieveAll,
  actionGroupsRetrieveAllSuccess,
  actionGroupsUpdateOneSuccess,
  actionGroupsUpsertOne
} from './groups.actions';

export function sortByTitle(a: Group, b: Group): number {
  return a.name.localeCompare(b.name);
}

export const groupAdapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  sortComparer: sortByTitle
});

export const initialState: GroupsState = groupAdapter.getInitialState({
  ids: [],
  entities: {}
});

const reducer = createReducer(
  initialState,
  on(actionGroupsUpsertOne, (state, { group }) =>
    groupAdapter.upsertOne(group, state)
  ),
  on(actionGroupsDeleteOne, (state, action) => {
    groupAdapter.removeOne(action.id, state);
    return groupAdapter.removeOne(action.id, state);
  }),
  on(actionGroupsRetrieveAll, (state) => groupAdapter.removeAll(state)),
  on(actionGroupsRetrieveAllSuccess, (state, { groups }) =>
    groupAdapter.addMany(groups, state)
  ),
  on(actionGroupsUpdateOneSuccess, (state, action) =>
    groupAdapter.updateOne(
      {
        id: action.id,
        changes: { ...action.group }
      },
      state
    )
  )
);

export function groupListReducer(
  state: GroupsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
