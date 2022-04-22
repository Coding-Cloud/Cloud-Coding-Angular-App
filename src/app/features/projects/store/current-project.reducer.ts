import { Action, createReducer, on } from '@ngrx/store';
import {
  actionProjectsGetOne,
  actionProjectsGetOneSuccess,
  actionProjectsUpdateOneSuccess,
  actionProjectSwitchEditMode
} from './projects.actions';
import {
  emptyProject,
  ProjectState
} from '../../../shared/models/project.model';

export const initialState: ProjectState = {
  project: emptyProject,
  editMode: false
};

const reducer = createReducer(
  initialState,
  on(actionProjectsGetOne, (_state) => ({
    ...initialState
  })),
  on(actionProjectSwitchEditMode, (state) => ({
    ...state,
    editMode: !state.editMode
  })),
  on(actionProjectsUpdateOneSuccess, (state, { project }) => ({
    ...state,
    project: {
      ...state.project,
      ...project
    },
    editMode: false
  })),
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
