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
import {
  ProjectsSearchState,
  ProjectsState,
  ProjectState
} from '../shared/models/project.model';
import { projectListReducer } from '../features/projects/store/project-list.reducer';
import { projectReducer } from '../features/projects/store/current-project.reducer';
import { GroupsState, GroupState } from '../shared/models/group.model';
import { groupListReducer } from '../features/groups/store/group-list.reducer';
import { groupReducer } from '../features/groups/store/current-group.reducer';
import { projectsSearchReducer } from '../features/projects/store/project-search.reducer';
import { usersSearchReducer } from '../features/social/users/store/user-search.reducer';
import { UsersState, UserState } from '../shared/models/user.model';
import { userViewReducer } from '../features/social/users/store/user-view.reducer';
import { CommentsState } from '../shared/models/comment.model';
import { commentsReducer } from '../features/social/comments/store/comments.reducer';
import { FollowersState } from '../shared/models/follower.model';
import { followersReducer } from '../features/social/users/store/follower.reducer';
import {
  FriendRequestsState,
  FriendshipsState
} from '../shared/models/friendship.model';
import { friendRequestsReducer } from '../features/social/friendships/store/friend-requests.reducer';
import { friendshipsReducer } from '../features/social/friendships/store/friendships.reducer';
import { ConversationState } from '../shared/models/conversation.model';
import { conversationReducer } from '../features/conversation/store/conversation.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  comments: commentsReducer,
  settings: settingsReducer,
  projects: projectListReducer,
  projectSearch: projectsSearchReducer,
  currentProject: projectReducer,
  groups: groupListReducer,
  currentGroup: groupReducer,
  userSearch: usersSearchReducer,
  userView: userViewReducer,
  router: routerReducer,
  followers: followersReducer,
  friendRequests: friendRequestsReducer,
  friendships: friendshipsReducer,
  conversation: conversationReducer
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

export const selectFriendRequestsState = createFeatureSelector<
  AppState,
  FriendRequestsState
>('friendRequests');

export const selectFriendshipsState = createFeatureSelector<
  AppState,
  FriendshipsState
>('friendships');

export const selectCommentsState = createFeatureSelector<
  AppState,
  CommentsState
>('comments');

export const selectConversationState = createFeatureSelector<
  AppState,
  ConversationState
>('conversation');

export const selectProjectsState = createFeatureSelector<
  AppState,
  ProjectsState
>('projects');

export const selectProjectsSearchState = createFeatureSelector<
  AppState,
  ProjectsSearchState
>('projectSearch');

export const selectUsersSearchState = createFeatureSelector<
  AppState,
  UsersState
>('userSearch');

export const selectUserViewState = createFeatureSelector<AppState, UserState>(
  'userView'
);

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

export const selectFollowersState = createFeatureSelector<
  AppState,
  FollowersState
>('followers');

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  projects: ProjectsState;
  projectSearch: ProjectsSearchState;
  currentProject: ProjectState;
  groups: GroupsState;
  currentGroup: GroupState;
  userSearch: UsersState;
  userView: UserState;
  router: RouterReducerState<RouterStateUrl>;
  comments: CommentsState;
  followers: FollowersState;
  friendRequests: FriendRequestsState;
  friendships: FriendshipsState;
  conversation: ConversationState;
}
