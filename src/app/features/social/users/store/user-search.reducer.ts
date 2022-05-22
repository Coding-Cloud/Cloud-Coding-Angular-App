import { User, UsersState } from '../../../../shared/models/user.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionUsersSearchInit,
  actionUsersSearchDialogSuccess,
  actionUsersSearch,
  actionUsersSearchError,
  actionUsersSearchSuccess
} from './users.actions';

export function sortByTitle(a: User, b: User): number {
  return a.email.localeCompare(b.email);
}

export const userSearchAdapter: EntityAdapter<User> = createEntityAdapter<User>(
  {
    sortComparer: sortByTitle
  }
);

export const initialState: UsersState = {
  users: userSearchAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  totalResults: 0,
  loading: false
};

const reducer = createReducer(
  initialState,
  on(actionUsersSearchInit, (state) => ({
    ...state,
    totalResults: 0,
    users: userSearchAdapter.removeAll(state.users)
  })),
  on(actionUsersSearchDialogSuccess, (state, { users }) => ({
    ...state,
    users: userSearchAdapter.setAll(users, state.users)
  })),
  on(actionUsersSearch, (state, payload) => ({
    ...state,
    loading: true
  })),
  on(actionUsersSearchError, (state) => ({
    ...state,
    users: userSearchAdapter.removeAll(state.users),
    loading: false
  })),
  on(actionUsersSearchSuccess, (state, payload) => ({
    ...state,
    users: userSearchAdapter.setAll(payload.users, state.users),
    totalResults: payload.totalResults,
    loading: false
  }))
);

export function usersSearchReducer(
  state: UsersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
