import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Project, ProjectsState } from '../../../shared/models/project.model';
import {
  actionProjectsDeleteOne,
  actionProjectsRetrieveAll,
  actionProjectsRetrieveAllSuccess,
  actionProjectsUpdateOneSuccess,
  actionProjectsUpsertOne
} from './projects.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Project, b: Project): number {
  return a.name.localeCompare(b.name);
}

export const projectListAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>({
    sortComparer: sortByTitle
  });

export const initialState: ProjectsState = projectListAdapter.getInitialState({
  ids: [],
  entities: {}
});

const reducer = createReducer(
  initialState,
  on(actionProjectsUpsertOne, (state, { project }) =>
    projectListAdapter.upsertOne(project, state)
  ),
  on(actionProjectsDeleteOne, (state, action) => {
    projectListAdapter.removeOne(action.id, state);
    return projectListAdapter.removeOne(action.id, state);
  }),
  on(actionProjectsRetrieveAll, (state) => projectListAdapter.removeAll(state)),
  on(actionProjectsRetrieveAllSuccess, (state, { projects }) =>
    projectListAdapter.addMany(projects, state)
  ),
  on(actionProjectsUpdateOneSuccess, (state, action) =>
    projectListAdapter.updateOne(
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
