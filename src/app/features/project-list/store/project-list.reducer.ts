import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import {
  Project,
  ProjectLanguage,
  ProjectState,
  ProjectStatus,
  ProjectVisibility
} from '../../../shared/models/project.model';
import {
  actionProjectsDeleteOne,
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
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      name: 'Mon premier projet',
      lastVersion: 1,
      language: ProjectLanguage.ANGULAR,
      status: ProjectStatus.RUNNING,
      globalVisibility: ProjectVisibility.PRIVATE,
      creatorId: '1223',
      groupId: '1885',
      createdAt: new Date()
    }
  }
});

const reducer = createReducer(
  initialState,
  on(actionProjectsUpsertOne, (state, { project }) =>
    projectAdapter.upsertOne(project, state)
  ),
  on(actionProjectsDeleteOne, (state, { id }) =>
    projectAdapter.removeOne(id, state)
  )
);

export function projectListReducer(
  state: ProjectState | undefined,
  action: Action
) {
  return reducer(state, action);
}
