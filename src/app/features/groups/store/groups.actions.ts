import { createAction, props } from '@ngrx/store';
import { Group, GroupForm } from '../../../shared/models/group.model';
import { Project } from '../../../shared/models/project.model';

export const actionGroupsUpsertOne = createAction(
  '[Groups] Upsert One',
  props<{ group: Group }>()
);

export const actionGroupsRetrieveAll = createAction('[Groups] Retrieve All');

export const actionGroupsRetrieveAllSuccess = createAction(
  '[Groups] Retrieve All Success',
  props<{ groups: Group[] }>()
);

export const actionGroupsRetrieveAllError = createAction(
  '[Groups] Retrieve All Error',
  props<{ message: string }>()
);
export const actionGroupsGetOne = createAction(
  '[Groups] Get One',
  props<{ id: string }>()
);

export const actionGroupsGetOneSuccess = createAction(
  '[Groups] Get One Success',
  props<{ group: Group }>()
);

export const actionGroupsGetOneProjectsSuccess = createAction(
  '[Groups] Get One Projects Success',
  props<{ projects: Project[] }>()
);

export const actionGroupsGetOneProjectsError = createAction(
  '[Groups] Get One Projects Error',
  props<{ message: string }>()
);

export const actionGroupsGetOneError = createAction(
  '[Groups] Get One Error',
  props<{ message: string }>()
);

export const actionGroupsAddOne = createAction(
  '[Groups] Add One',
  props<{ group: GroupForm }>()
);
export const actionGroupsAddOneSuccess = createAction(
  '[Groups] Add One Success'
);

export const actionGroupsAddOneError = createAction(
  '[Groups] Add One Error',
  props<{ message: string }>()
);

export const actionGroupsDeleteOne = createAction(
  '[Groups] Delete One',
  props<{ id: string }>()
);
export const actionGroupsDeleteOneSuccess = createAction(
  '[Groups] Delete One Success'
);

export const actionGroupsDeleteOneError = createAction(
  '[Groups] Delete One Error',
  props<{ message: string }>()
);

export const actionGroupSwitchEditMode = createAction(
  '[Groups] Switch Edit Mode'
);

export const actionGroupsUpdateOne = createAction(
  '[Groups] Update One',
  props<{ id: string; group: GroupForm }>()
);

export const actionGroupsUpdateOneSuccess = createAction(
  '[Groups] Update One Success',
  props<{ id: string; group: GroupForm }>()
);

export const actionGroupsUpdateOneError = createAction(
  '[Groups] Update One Error',
  props<{ message: string }>()
);
