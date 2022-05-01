import { Action, createReducer, on } from '@ngrx/store';
import {
  actionGroupsAddMembershipSuccess,
  actionGroupsAddProjectSuccess,
  actionGroupsGetMemberSuccess,
  actionGroupsGetOne,
  actionGroupsGetOneProjectsSuccess,
  actionGroupsGetOneSuccess,
  actionGroupsRemoveMembershipSuccess,
  actionGroupsUpdateMembershipSuccess,
  actionGroupsUpdateOneOwnedSuccess,
  actionGroupSwitchEditMode
} from './groups.actions';
import { emptyGroup, GroupState } from '../../../shared/models/group.model';

export const initialState: GroupState = {
  group: emptyGroup,
  messages: [],
  members: [],
  editMode: false
};

const reducer = createReducer(
  initialState,
  on(actionGroupsGetOne, (_state) => ({
    ...initialState
  })),
  on(actionGroupSwitchEditMode, (state) => ({
    ...state,
    editMode: !state.editMode
  })),
  on(actionGroupsUpdateOneOwnedSuccess, (state, { group }) => ({
    ...state,
    group: {
      ...state.group,
      ...group
    },
    editMode: false
  })),
  on(actionGroupsGetOneSuccess, (state, payload) => ({
    ...state,
    group: { ...state.group, ...payload.group }
  })),
  on(actionGroupsGetOneProjectsSuccess, (state, payload) => ({
    ...state,
    group: {
      ...state.group,
      projects: payload.projects
    }
  })),
  on(actionGroupsGetMemberSuccess, (state, payload) => ({
    ...state,
    members: [...state.members, payload.member]
  })),
  on(actionGroupsAddMembershipSuccess, (state, payload) => ({
    ...state,
    members: [...state.members, payload.groupMembership]
  })),
  on(actionGroupsRemoveMembershipSuccess, (state, payload) => ({
    ...state,
    members: state.members.filter(
      (member) => member.userId !== payload.groupMembership.userId
    )
  })),
  on(actionGroupsAddProjectSuccess, (state, payload) => ({
    ...state,
    group: {
      ...state.group,
      projects: [...state.group.projects, payload.project]
    }
  })),
  on(actionGroupsUpdateMembershipSuccess, (state, payload) => ({
    ...state,
    members: state.members.map((membership) => {
      if (membership.userId === payload.groupMembership.userId) {
        return {
          ...membership,
          canEdit: payload.groupMembership.canEdit
        };
      }
      return membership;
    })
  }))
);

export function groupReducer(
  state: GroupState | undefined,
  action: Action
): GroupState {
  return reducer(state, action);
}
