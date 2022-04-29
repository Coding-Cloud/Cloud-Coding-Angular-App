import { EntityState } from '@ngrx/entity';
import { Project } from './project.model';
import { Message } from './message.model';

export interface Group {
  id: string;
  name: string;
  ownerId: string;
  ownerUsername: string;
  conversationId: string;
  isHidden: boolean;
  createdAt: Date;
  projects: Project[];
}

export interface GroupForm {
  name: string;
}

export interface GroupMembership {
  userId: string;
  groupId: string;
  canEdit: boolean;
}

export const emptyGroup: Group = {
  id: '',
  name: '',
  ownerId: '',
  ownerUsername: '',
  conversationId: '',
  isHidden: false,
  createdAt: new Date(),
  projects: []
};

export type GroupsState = {
  ownedGroups: EntityState<Group>;
  joinedGroups: EntityState<Group>;
};

export type GroupState = {
  group: Group;
  messages: Message[];
  members: GroupMembership[];
  editMode: boolean;
};
