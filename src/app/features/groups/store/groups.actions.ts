import { createAction, props } from '@ngrx/store';
import {
  Group,
  GroupForm,
  GroupMembership
} from '../../../shared/models/group.model';
import { Project } from '../../../shared/models/project.model';

export const actionGroupsUpsertOneOwned = createAction(
  '[Groups] Upsert One Owned',
  props<{ group: Group }>()
);

export const actionGroupsRetrieveAllOwned = createAction(
  '[Groups] Retrieve All Owned'
);

export const actionGroupsRetrieveAllOwnedSuccess = createAction(
  '[Groups] Retrieve All Owned Success',
  props<{ groups: Group[] }>()
);

export const actionGroupsRetrieveAllOwnedError = createAction(
  '[Groups] Retrieve All Owned Error',
  props<{ message: string }>()
);

export const actionGroupsUpsertOneJoined = createAction(
  '[Groups] Upsert One Joined',
  props<{ group: Group }>()
);

export const actionGroupsRetrieveAllJoined = createAction(
  '[Groups] Retrieve All Joined'
);

export const actionGroupsRetrieveAllJoinedSuccess = createAction(
  '[Groups] Retrieve All Joined Success',
  props<{ groups: Group[] }>()
);

export const actionGroupsRetrieveAllJoinedError = createAction(
  '[Groups] Retrieve All Joined Error',
  props<{ message: string }>()
);

export const actionGroupsGetOne = createAction(
  '[Groups] Get One',
  props<{ id: string }>()
);

export const actionGroupsGetMember = createAction(
  '[Groups] Get member',
  props<{ userId: string; canEdit: boolean }>()
);

export const actionGroupsGetMemberSuccess = createAction(
  '[Groups] Get member success',
  props<{ member: GroupMembership }>()
);

export const actionGroupsGetMemberError = createAction(
  '[Groups] Get member error',
  props<{ message: string }>()
);

export const actionGroupsUpdateMembership = createAction(
  '[Groups] Update membership',
  props<{ groupMembership: GroupMembership }>()
);

export const actionGroupsUpdateMembershipSuccess = createAction(
  '[Groups] Update membership success',
  props<{ groupMembership: GroupMembership }>()
);

export const actionGroupsUpdateMembershipError = createAction(
  '[Groups] Update membership error',
  props<{ message: string }>()
);

export const actionGroupsGetOneSuccess = createAction(
  '[Groups] Get One Success',
  props<{ group: Group }>()
);

export const actionGroupsGetOneProjectsSuccess = createAction(
  '[Groups] Get One Projects Success',
  props<{ projects: Project[] }>()
);

export const actionGroupsGetOneProjectsError = createAction(
  '[Groups] Get One Projects Error',
  props<{ message: string }>()
);

export const actionGroupsGetOneError = createAction(
  '[Groups] Get One Error',
  props<{ message: string }>()
);

export const actionGroupsAddOne = createAction(
  '[Groups] Add One',
  props<{ group: GroupForm }>()
);
export const actionGroupsAddOneSuccess = createAction(
  '[Groups] Add One Success'
);

export const actionGroupsAddOneError = createAction(
  '[Groups] Add One Error',
  props<{ message: string }>()
);

export const actionGroupsDeleteOneOwned = createAction(
  '[Groups] Delete One',
  props<{ id: string }>()
);
export const actionGroupsDeleteOneJoined = createAction(
  '[Groups] Delete One',
  props<{ id: string }>()
);
export const actionGroupsDeleteOneSuccess = createAction(
  '[Groups] Delete One Success'
);

export const actionGroupsDeleteOneError = createAction(
  '[Groups] Delete One Error',
  props<{ message: string }>()
);

export const actionGroupsUpdateOneOwned = createAction(
  '[Groups] Update One',
  props<{ id: string; group: GroupForm }>()
);

export const actionGroupsUpdateOneOwnedSuccess = createAction(
  '[Groups] Update One Success',
  props<{ id: string; group: GroupForm }>()
);
export const actionGroupsUpdateOneJoinedSuccess = createAction(
  '[Groups] Update One Success',
  props<{ id: string; group: GroupForm }>()
);

export const actionGroupsUpdateOneError = createAction(
  '[Groups] Update One Error',
  props<{ message: string }>()
);

export const actionGroupSwitchEditMode = createAction(
  '[Groups] Switch Edit Mode'
);
