import { EntityState } from '@ngrx/entity';
import { Project } from './project.model';

export interface Group {
  id: string;
  name: string;
  ownerId: string;
  ownerUsername: string;
  conversationId: string;
  createdWithProject: boolean;
  createdAt: Date;
  projects: Project[];
}

export interface GroupForm {
  name: string;
}

export const emptyGroup: Group = {
  id: '',
  name: '',
  ownerId: '',
  ownerUsername: '',
  conversationId: '',
  createdWithProject: false,
  createdAt: new Date(),
  projects: []
};

export type GroupsState = EntityState<Group>;
export type GroupState = {
  group: Group;
  editMode: boolean;
};
