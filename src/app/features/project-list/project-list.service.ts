import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { User, UserForm } from '../../shared/models/user.models';
import { Observable, of } from 'rxjs';
import {
  Project,
  ProjectLanguage,
  ProjectStatus,
  ProjectVisibility
} from '../../shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return of([
      {
        id: '123',
        name: 'Mon premier projet',
        lastVersion: 1,
        language: ProjectLanguage.ANGULAR,
        status: ProjectStatus.RUNNING,
        globalVisibility: ProjectVisibility.PRIVATE,
        creatorId: '1223',
        groupId: '1885',
        createdAt: new Date()
      }
    ]);

    return this.http.get<Project[]>(API_RESOURCE_URI.PROJECTS);
  }
}
