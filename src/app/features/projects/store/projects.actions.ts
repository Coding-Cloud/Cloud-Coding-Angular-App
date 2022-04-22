import { createAction, props } from '@ngrx/store';
import { Project, ProjectForm } from '../../../shared/models/project.model';

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

export const actionProjectsAddOne = createAction(
  '[Projects] Add One',
  props<{ project: ProjectForm }>()
);
export const actionProjectsAddOneSuccess = createAction(
  '[Projects] Add One Success'
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
