import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Project, ProjectState } from './project.model';
import {
  actionProjectsDeleteOne,
  actionProjectsUpsertOne
} from './project-list.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Project, b: Project): number {
  return a.title.localeCompare(b.title);
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
      title: 'Angular app',
      owner: 'Nospy',
      description:
        'My beautiful Angular app. It is so beautiful that I am going to share it with you all.',
      createdAt: new Date(),
      techno: 'Angular'
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
