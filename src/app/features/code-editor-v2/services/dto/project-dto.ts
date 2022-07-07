import {
  ProjectLanguage,
  ProjectStatus,
  ProjectVisibility
} from '../../../../shared/models/project.model';

export interface ProjectDto {
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
