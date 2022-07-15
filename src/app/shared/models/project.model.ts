import { EntityState } from '@ngrx/entity';
import { Group } from './group.model';

export interface Project {
  id: string;
  name: string;
  uniqueName: string;
  lastVersion: number;
  language: ProjectLanguage;
  status: ProjectStatus;
  globalVisibility: ProjectVisibility;
  creatorId: string;
  groupId: string;
  createdAt: Date;
}

export interface ProjectForm {
  name: string;
  language: ProjectLanguage;
  globalVisibility: ProjectVisibility;
  groupId?: string;
}

export interface ProjectCustomForm {
  name: string;
  language: ProjectLanguage;
  link: string;
  globalVisibility: ProjectVisibility;
  groupId?: string;
}

export enum ProjectLanguage {
  ANGULAR = 'ANGULAR',
  REACT = 'REACT',
  QUARKUS = 'QUARKUS',
  NESTJS = 'NESTJS',
  FLASK = 'FLASK'
}

export enum ProjectStatus {
  INITIALISING = 'INITIALISING',
  INACTIVE = 'INACTIVE',
  RUNNING = 'RUNNING'
}

export enum ProjectVisibility {
  PRIVATE,
  PUBLIC,
  GUEST
}

export const emptyProject: Project = {
  id: '',
  name: '',
  uniqueName: '',
  lastVersion: 0,
  language: ProjectLanguage.ANGULAR,
  status: ProjectStatus.INACTIVE,
  globalVisibility: ProjectVisibility.PRIVATE,
  creatorId: '',
  groupId: '',
  createdAt: new Date()
};

export type ProjectsState = EntityState<Project>;

export interface ProjectsSearchState {
  projects: EntityState<Project>;
  totalResults: number;
  loading: boolean;
}

export interface ProjectState {
  project: Project;
  group: Group;
  editMode: boolean;
}
