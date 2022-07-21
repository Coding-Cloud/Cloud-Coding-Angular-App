import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import {
  Project,
  ProjectsSearchState
} from '../../../shared/models/project.model';
import {
  actionProjectsSearch,
  actionProjectsSearchDialogSuccess,
  actionProjectsSearchError,
  actionProjectsSearchInit,
  actionProjectsSearchSuccess
} from './projects.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Project, b: Project): number {
  return a.name.localeCompare(b.name);
}

export const projectSearchAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>({
    sortComparer: sortByTitle
  });

export const initialState: ProjectsSearchState = {
  projects: projectSearchAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  totalResults: 0,
  loading: false
};

const reducer = createReducer(
  initialState,
  on(actionProjectsSearchInit, (state) => ({
    ...state,
    loading: false,
    totalResults: 0,
    projects: projectSearchAdapter.removeAll(state.projects)
  })),
  on(actionProjectsSearchDialogSuccess, (state, { projects }) => ({
    ...state,
    projects: projectSearchAdapter.setAll(projects, state.projects)
  })),
  on(actionProjectsSearch, (state, payload) => ({
    ...state,
    loading: true
  })),
  on(actionProjectsSearchError, (state) => ({
    ...state,
    projects: projectSearchAdapter.removeAll(state.projects),
    loading: false
  })),
  on(actionProjectsSearchSuccess, (state, payload) => ({
    ...state,
    projects: projectSearchAdapter.setAll(payload.projects, state.projects),
    totalResults: payload.totalResults,
    loading: false
  }))
);

export function projectsSearchReducer(
  state: ProjectsSearchState | undefined,
  action: Action
) {
  return reducer(state, action);
}
