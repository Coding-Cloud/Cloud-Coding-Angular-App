import { createSelector } from '@ngrx/store';

import { projectAdapter } from './project-list.reducer';
import { selectProjectsState } from '../../../core/core.state';
import { ProjectState } from '../../../shared/models/project.model';

const { selectEntities, selectAll, selectTotal } =
  projectAdapter.getSelectors();

export const selectProjects = createSelector(
  selectProjectsState,
  (state: ProjectState) => state
);

export const selectAllProjects = createSelector(selectProjects, selectAll);
export const selectProjectsEntities = createSelector(
  selectProjects,
  selectEntities
);
export const selectProjectsCount = createSelector(selectProjects, selectTotal);
