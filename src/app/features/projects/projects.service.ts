import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { Observable, of } from 'rxjs';
import {
  Project,
  ProjectForm,
  ProjectLanguage,
  ProjectStatus,
  ProjectVisibility
} from '../../shared/models/project.model';
import { HttpTools } from '../../shared/http-tools/http-tools';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS_OWNED);
  }

  searchProjectsDialog(name: string): Observable<Project[]> {
    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS_SEARCH, {
      params: HttpTools.objectToHttpParams({ name })
    });
  }

  searchProjects(
    offset: number,
    limit: number,
    search?: string
  ): Observable<{ projects: Project[]; totalResults: number }> {
    /* return of({
      projects: [
        {
          id: '1',
          creatorId: '1',
          groupId: '1',
          name: 'Project 1',
          createdAt: new Date(),
          lastVersion: 1,
          globalVisibility: ProjectVisibility.PUBLIC,
          language: ProjectLanguage.ANGULAR,
          status: ProjectStatus.RUNNING,
          uniqueName: 'project-1'
        },
        {
          id: '2',
          creatorId: '2',
          groupId: '2',
          name: 'Project 2',
          createdAt: new Date(),
          lastVersion: 1,
          globalVisibility: ProjectVisibility.GUEST,
          language: ProjectLanguage.QUARKUS,
          status: ProjectStatus.INITIALISING,
          uniqueName: 'project-2'
        }
      ],
      totalResults: 2
    }); */

    return this.http.get<{ projects: Project[]; totalResults: number }>(
      API_RESOURCE_URI.PROJECTS,
      {
        params: HttpTools.objectToHttpParams({ search, limit, offset })
      }
    );
  }

  getProjectName(projectId: string): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(
      API_RESOURCE_URI.PROJECTS_NAME + '/' + projectId
    );
  }

  getUserProjects(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS_USER(userId));
  }

  updateProjectGroup(projectId: string, groupId: string): Observable<any> {
    return this.http.patch(
      API_RESOURCE_URI.PROJECTS_UPDATE_GROUP(projectId, groupId),
      {}
    );
  }

  addProject(project: ProjectForm): Observable<string> {
    return this.http.post(
      API_RESOURCE_URI.PROJECTS,
      { ...project },
      { responseType: 'text' }
    );
  }

  updateProject(projectId: string, project: ProjectForm): Observable<any> {
    return this.http.patch<any>(API_RESOURCE_URI.PROJECTS + '/' + projectId, {
      ...project
    });
  }

  getProject(projectId: string): Observable<Project> {
    return this.http.get<Project>(API_RESOURCE_URI.PROJECTS + '/' + projectId);
  }

  getProjectByUniqueName(uniqueName: string): Observable<Project> {
    return this.http.get<Project>(
      API_RESOURCE_URI.PROJECTS + '/unique-name/' + uniqueName
    );
  }

  getProjectsByGroupId(groupId: string): Observable<Project[]> {
    return this.http.get<Project[]>(
      API_RESOURCE_URI.PROJECTS + '/group/' + groupId
    );
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete<any>(API_RESOURCE_URI.PROJECTS + '/' + projectId);
  }

  removeProjectGroup(projectId: string): Observable<any> {
    return this.http.patch(
      API_RESOURCE_URI.PROJECTS_REMOVE_GROUP(projectId),
      {}
    );
  }
}
