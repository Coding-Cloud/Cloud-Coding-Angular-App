import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Project, ProjectsState } from '../../../shared/models/project.model';
import {
  actionProjectsDeleteOne,
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllSuccess,
  actionProjectsUpdateOneSuccess,
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

export const initialState: ProjectsState = projectAdapter.getInitialState({
  ids: [],
  entities: {}
});

const reducer = createReducer(
  initialState,
  on(actionProjectsUpsertOne, (state, { project }) =>
    projectAdapter.upsertOne(project, state)
  ),
  on(actionProjectsDeleteOne, (state, action) => {
    projectAdapter.removeOne(action.id, state);
    return projectAdapter.removeOne(action.id, state);
  }),
  on(actionProjectsRetrieveAll, (state) => projectAdapter.removeAll(state)),
  on(actionProjectsRetrieveAllSuccess, (state, { projects }) =>
    projectAdapter.addMany(projects, state)
  ),
  on(actionProjectsUpdateOneSuccess, (state, action) =>
    projectAdapter.updateOne(
      {
        id: action.id,
        changes: { ...action.project }
      },
      state
    )
  )
);

export function projectListReducer(
  state: ProjectsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
