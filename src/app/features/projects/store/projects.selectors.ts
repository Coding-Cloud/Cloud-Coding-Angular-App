import { createSelector } from '@ngrx/store';

import { projectListAdapter } from './project-list.reducer';
import { projectSearchAdapter } from './project-search.reducer';
import {
  selectCurrentProjectState,
  selectProjectsSearchState,
  selectProjectsState
} from '../../../core/core.state';
import {
  ProjectsState,
  ProjectState
} from '../../../shared/models/project.model';

const projectListSelector = projectListAdapter.getSelectors();
const projectSearchSelector = projectSearchAdapter.getSelectors();

export const selectProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state
);

export const selectProjectsSearch = createSelector(
  selectProjectsSearchState,
  (state: ProjectsState) => state
);

export const selectCurrentProject = createSelector(
  selectCurrentProjectState,
  (state: ProjectState) => state.project
);

export const selectCurrentProjectGroup = createSelector(
  selectCurrentProjectState,
  (state: ProjectState) => state.group
);

export const selectCurrentProjectIsEditMode = createSelector(
  selectCurrentProjectState,
  (state: ProjectState) => state.editMode
);

export const selectAllProjects = createSelector(
  selectProjects,
  projectListSelector.selectAll
);
export const selectProjectsEntities = createSelector(
  selectProjects,
  projectListSelector.selectEntities
);
export const selectProjectsCount = createSelector(
  selectProjects,
  projectListSelector.selectTotal
);

export const selectAllProjectsSearch = createSelector(
  selectProjectsSearch,
  projectSearchSelector.selectAll
);
