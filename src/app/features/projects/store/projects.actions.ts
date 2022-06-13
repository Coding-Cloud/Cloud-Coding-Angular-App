import { createAction, props } from '@ngrx/store';
import { Project, ProjectForm } from '../../../shared/models/project.model';
import { Group } from '../../../shared/models/group.model';

export const actionProjectsUpsertOne = createAction(
  '[Projects] Upsert One',
  props<{ project: Project }>()
);

export const actionProjectsRetrieveAll = createAction(
  '[Projects] Retrieve All'
);

export const actionProjectsRetrieveAllSuccess = createAction(
  '[Projects] Retrieve All Success',
  props<{ projects: Project[] }>()
);

export const actionProjectsRetrieveAllError = createAction(
  '[Projects] Retrieve All Error',
  props<{ message: string }>()
);
export const actionProjectsRetrieveAllJoinedSuccess = createAction(
  '[Projects] Retrieve All Joined Success',
  props<{ projects: Project[] }>()
);

export const actionProjectsRetrieveAllJoinedError = createAction(
  '[Projects] Retrieve All Joined Error',
  props<{ message: string }>()
);
export const actionProjectsGetOne = createAction(
  '[Projects] Get One',
  props<{ id: string }>()
);

export const actionProjectsGetOneSuccess = createAction(
  '[Projects] Get One Success',
  props<{ project: Project }>()
);

export const actionProjectsGetOneError = createAction(
  '[Projects] Get One Error',
  props<{ message: string }>()
);

export const actionProjectsGetOneGroupSuccess = createAction(
  '[Projects] Get One Group Success',
  props<{ group: Group }>()
);

export const actionProjectsGetOneGroupError = createAction(
  '[Projects] Get One Group Error',
  props<{ message: string }>()
);

export const actionProjectsAddOne = createAction(
  '[Projects] Add One',
  props<{ project: ProjectForm }>()
);
export const actionProjectsAddOneSuccess = createAction(
  '[Projects] Add One Success',
  props<{ projectId: string }>()
);

export const actionProjectsAddOneError = createAction(
  '[Projects] Add One Error',
  props<{ message: string }>()
);

export const actionProjectsDeleteOne = createAction(
  '[Projects] Delete One',
  props<{ id: string }>()
);
export const actionProjectsDeleteOneSuccess = createAction(
  '[Projects] Delete One Success'
);

export const actionProjectsDeleteOneError = createAction(
  '[Projects] Delete One Error',
  props<{ message: string }>()
);

export const actionProjectSwitchEditMode = createAction(
  '[Projects] Switch Edit Mode'
);

export const actionProjectsUpdateOne = createAction(
  '[Projects] Update One',
  props<{ id: string; project: ProjectForm }>()
);

export const actionProjectsUpdateOneSuccess = createAction(
  '[Projects] Update One Success',
  props<{ id: string; project: ProjectForm }>()
);

export const actionProjectsUpdateOneError = createAction(
  '[Projects] Update One Error',
  props<{ message: string }>()
);

export const actionProjectsSearchInit = createAction('[Projects] Search Init');

export const actionProjectsSearchDialog = createAction(
  '[Projects] Search projects dialog',
  props<{ search: string }>()
);

export const actionProjectsSearchDialogSuccess = createAction(
  '[Projects] Search projects dialog success',
  props<{ projects: Project[] }>()
);

export const actionProjectsSearchDialogError = createAction(
  '[Projects] Search projects dialog error',
  props<{ message: string }>()
);

export const actionProjectsSearch = createAction(
  '[Projects] Search projects',
  props<{ search?: string; limit: number; page: number }>()
);

export const actionProjectsSearchSuccess = createAction(
  '[Projects] Search projects success',
  props<{ projects: Project[]; totalResults: number }>()
);

export const actionProjectsSearchError = createAction(
  '[Projects] Search projects error',
  props<{ message: string }>()
);
