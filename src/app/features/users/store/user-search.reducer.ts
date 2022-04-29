import { User, UsersState } from '../../../shared/models/user.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionUsersSearchInit,
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

export const initialState: UsersState = userSearchAdapter.getInitialState({
  ids: [],
  entities: {}
});

const reducer = createReducer(
  initialState,
  on(actionUsersSearchInit, (state) => userSearchAdapter.removeAll(state)),
  on(actionUsersSearchSuccess, (state, { users }) =>
    userSearchAdapter.setAll(users, state)
  )
);

export function usersSearchReducer(
  state: UsersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
