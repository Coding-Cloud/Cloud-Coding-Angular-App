import { createAction, props } from '@ngrx/store';
import { Project, ProjectForm } from '../../../shared/models/project.model';

export const actionProjectsUpsertOne = createAction(
  '[Project List] Upsert One',
  props<{ project: Project }>()
);

export const actionProjectsDeleteOne = createAction(
  '[Project List] Delete One',
  props<{ id: string }>()
);

export const actionProjectsRetrieveAll = createAction(
  '[Project List] Retrieve All'
);

export const actionProjectsRetrieveAllSuccess = createAction(
  '[Project List] Retrieve All Success',
  props<{ projects: Project[] }>()
);

export const actionProjectsRetrieveAllError = createAction(
  '[Project List] Retrieve All Error',
  props<{ message: string }>()
);

export const actionProjectsAddOne = createAction(
  '[Project List] Add One',
  props<{ project: ProjectForm }>()
);
export const actionProjectsAddOneSuccess = createAction(
  '[Project List] Add One Success'
);

export const actionProjectsAddOneError = createAction(
  '[Project List] Add One',
  props<{ message: string }>()
);
