import { EntityState } from '@ngrx/entity';

export interface Project {
  id: string;
  title: string;
  owner: string;
  techno: string;
  description: string;
  createdAt: Date;
}

export type ProjectState = EntityState<Project>;
