import { EntityState } from '@ngrx/entity';

export interface Group {
  id: string;
  name: string;
  ownerId: string;
  ownerUsername: string;
  conversationId: string;
  createdWithProject: boolean;
  createdAt: Date;
}

export interface GroupForm {
  name: string;
}

export type GroupsState = EntityState<Group>;
