import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Project, ProjectsState } from '../../../shared/models/project.model';
import {
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

export const initialState: ProjectsState = projectSearchAdapter.getInitialState(
  {
    ids: [],
    entities: {}
  }
);

const reducer = createReducer(
  initialState,
  on(actionProjectsSearchInit, (state) =>
    projectSearchAdapter.removeAll(state)
  ),
  on(actionProjectsSearchSuccess, (state, { projects }) =>
    projectSearchAdapter.setAll(projects, state)
  )
);

export function projectsSearchReducer(
  state: ProjectsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
