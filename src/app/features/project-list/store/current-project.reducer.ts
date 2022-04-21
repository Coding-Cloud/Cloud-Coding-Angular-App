import { Action, createReducer, on } from '@ngrx/store';
import {
  emptyProject,
  ProjectState
} from '../../../shared/models/project.model';
import { actionProjectsGetOneSuccess } from './project-list.actions';

export const initialState: ProjectState = {
  project: emptyProject
};

const reducer = createReducer(
  initialState,
  on(actionProjectsGetOneSuccess, (state, payload) => ({
    ...state,
    project: payload.project
  }))
);

export function projectReducer(
  state: ProjectState | undefined,
  action: Action
): ProjectState {
  return reducer(state, action);
}
