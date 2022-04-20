import { EntityState } from '@ngrx/entity';

export interface Project {
  id: string;
  name: string;
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
}

export enum ProjectLanguage {
  ANGULAR = 'ANGULAR',
  REACT = 'REACT'
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

export type ProjectState = EntityState<Project>;
