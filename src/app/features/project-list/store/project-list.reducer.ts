import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Project, ProjectState } from '../../../shared/models/project.model';
import {
  actionProjectsDeleteOne,
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllSuccess,
  actionProjectsUpsertOne
} from './project-list.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Project, b: Project): number {
  return a.name.localeCompare(b.name);
}

export const projectAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>({
    sortComparer: sortByTitle
  });

export const initialState: ProjectState = projectAdapter.getInitialState({
  ids: [],
  entities: {}
});

const reducer = createReducer(
  initialState,
  on(actionProjectsUpsertOne, (state, { project }) =>
    projectAdapter.upsertOne(project, state)
  ),
  on(actionProjectsDeleteOne, (state, { id }) =>
    projectAdapter.removeOne(id, state)
  ),
  on(actionProjectsRetrieveAll, (state) => projectAdapter.removeAll(state)),
  on(actionProjectsRetrieveAllSuccess, (state, { projects }) =>
    projectAdapter.addMany(projects, state)
  )
);

export function projectListReducer(
  state: ProjectState | undefined,
  action: Action
) {
  return reducer(state, action);
}
