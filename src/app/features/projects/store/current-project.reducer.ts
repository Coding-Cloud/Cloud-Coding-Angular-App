import { Action, createReducer, on } from '@ngrx/store';
import {
  actionProjectsGetOne,
  actionProjectsGetOneGroupSuccess,
  actionProjectsGetOneSuccess,
  actionProjectsUpdateOneSuccess,
  actionProjectSwitchEditMode
} from './projects.actions';
import {
  emptyProject,
  ProjectState
} from '../../../shared/models/project.model';
import { emptyGroup } from '../../../shared/models/group.model';

export const initialState: ProjectState = {
  project: emptyProject,
  group: emptyGroup,
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
  })),
  on(actionProjectsGetOneGroupSuccess, (state, payload) => ({
    ...state,
    group: { ...payload.group }
  }))
);

export function projectReducer(
  state: ProjectState | undefined,
  action: Action
): ProjectState {
  return reducer(state, action);
}
