import { Injectable } from '@angular/core';
import {
  environment,
  environment as env
} from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectVersionsService {
  private baseUrl = `${env.apiUrl}/projects-version`;

  constructor(private http: HttpClient) {}

  getProjectVersions(getProjectVersionsProp: {
    projectUniqueName: string;
  }): Observable<string[]> {
    console.log('je apsse dans le get project versions');
    if (environment.envName === 'LOCAL') {
      return of(['1', '2', '3']);
    }

    return this.http.get<string[]>(
      `${this.baseUrl}/${getProjectVersionsProp.projectUniqueName}`
    );
  }

  addProjectVersion(addProjectVersionProp: {
    title: string;
    projectId: string;
  }): Observable<void> {
    console.log('on add un project version');
    return this.http.post<void>(
      `${this.baseUrl}/${addProjectVersionProp.projectId}`,
      {
        title: addProjectVersionProp.title
      }
    );
  }

  changeProjectVersion(changeProjectVersionProp: {
    numberVersionRollback: number;
    projectId: string;
  }): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/${changeProjectVersionProp.projectId}/${changeProjectVersionProp.numberVersionRollback}`,
      {}
    );
  }
}
