import { EntityState } from '@ngrx/entity';
import { ProjectLanguage, ProjectVisibility } from './project.model';

export interface Group {
  id: string;
  name: string;
  ownerId: string;
  conversationId: string;
  createdWithProject: boolean;
  createdAt: Date;
}

export interface GroupForm {
  name: string;
}

export type GroupsState = EntityState<Group>;
