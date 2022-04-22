import { createAction, props } from '@ngrx/store';
import { Group, GroupForm } from '../../../shared/models/group.model';

export const actionGroupsUpsertOne = createAction(
  '[Groups] Upsert One',
  props<{ group: Group }>()
);

export const actionGroupsRetrieveAll = createAction(
  '[Group List] Retrieve All'
);

export const actionGroupsRetrieveAllSuccess = createAction(
  '[Group List] Retrieve All Success',
  props<{ groups: Group[] }>()
);

export const actionGroupsRetrieveAllError = createAction(
  '[Group List] Retrieve All Error',
  props<{ message: string }>()
);
export const actionGroupsGetOne = createAction(
  '[Group List] Get One',
  props<{ id: string }>()
);

export const actionGroupsGetOneSuccess = createAction(
  '[Group List] Get One Success',
  props<{ group: Group }>()
);

export const actionGroupsGetOneError = createAction(
  '[Group List] Get One Error',
  props<{ message: string }>()
);

export const actionGroupsAddOne = createAction(
  '[Group List] Add One',
  props<{ group: GroupForm }>()
);
export const actionGroupsAddOneSuccess = createAction(
  '[Group List] Add One Success'
);

export const actionGroupsAddOneError = createAction(
  '[Group List] Add One Error',
  props<{ message: string }>()
);

export const actionGroupsDeleteOne = createAction(
  '[Group List] Delete One',
  props<{ id: string }>()
);
export const actionGroupsDeleteOneSuccess = createAction(
  '[Group List] Delete One Success'
);

export const actionGroupsDeleteOneError = createAction(
  '[Group List] Delete One Error',
  props<{ message: string }>()
);

export const actionGroupSwitchEditMode = createAction(
  '[Group List] Switch Edit Mode'
);

export const actionGroupsUpdateOne = createAction(
  '[Group List] Update One',
  props<{ id: string; group: GroupForm }>()
);

export const actionGroupsUpdateOneSuccess = createAction(
  '[Group List] Update One Success',
  props<{ id: string; group: GroupForm }>()
);

export const actionGroupsUpdateOneError = createAction(
  '[Group List] Update One Error',
  props<{ message: string }>()
);
