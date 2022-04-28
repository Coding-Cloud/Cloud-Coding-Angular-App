import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from '../shared/models/auth.model';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from '../shared/models/settings.model';
import { ProjectsState, ProjectState } from '../shared/models/project.model';
import { projectListReducer } from '../features/projects/store/project-list.reducer';
import { projectReducer } from '../features/projects/store/current-project.reducer';
import { GroupsState, GroupState } from '../shared/models/group.model';
import { groupListReducer } from '../features/groups/store/group-list.reducer';
import { groupReducer } from '../features/groups/store/current-group.reducer';
import { projectsSearchReducer } from '../features/projects/store/project-search.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  settings: settingsReducer,
  projects: projectListReducer,
  projectSearch: projectsSearchReducer,
  currentProject: projectReducer,
  groups: groupListReducer,
  currentGroup: groupReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export const selectProjectsState = createFeatureSelector<
  AppState,
  ProjectsState
>('projects');

export const selectProjectsSearchState = createFeatureSelector<
  AppState,
  ProjectsState
>('projectSearch');

export const selectGroupsState = createFeatureSelector<AppState, GroupsState>(
  'groups'
);

export const selectCurrentProjectState = createFeatureSelector<
  AppState,
  ProjectState
>('currentProject');

export const selectCurrentGroupState = createFeatureSelector<
  AppState,
  GroupState
>('currentGroup');

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  projects: ProjectsState;
  projectSearch: ProjectsState;
  currentProject: ProjectState;
  groups: GroupsState;
  currentGroup: GroupState;
  router: RouterReducerState<RouterStateUrl>;
}
