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

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS_OWNED);
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

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete<any>(API_RESOURCE_URI.PROJECTS + '/' + projectId);
  }
}
