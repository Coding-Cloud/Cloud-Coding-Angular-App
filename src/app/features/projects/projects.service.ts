import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { Observable } from 'rxjs';
import { Project, ProjectForm } from '../../shared/models/project.model';
import { HttpTools } from '../../shared/http-tools/http-tools';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS_OWNED);
  }

  searchProjects(name: string): Observable<Project[]> {
    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS_SEARCH, {
      params: HttpTools.objectToHttpParams({ name })
    });
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
