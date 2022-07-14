import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
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
    return of(['initial version', 'secund version', 'third version']);
    return this.http.get<string[]>(
      `${this.baseUrl}/${getProjectVersionsProp.projectUniqueName}`
    );
  }

  addProjectVersion(addProjectVersionProp: {
    title: string;
    projectId: string;
  }): Observable<void> {
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