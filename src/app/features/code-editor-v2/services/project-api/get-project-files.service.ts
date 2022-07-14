import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from '../../types/folder.interface';
import { environment as env } from '../../../../../environments/environment';
import { Project } from 'src/app/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class GetProjectFilesService {
  private baseUrl = `${env.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProject(porjectId: string): Observable<{
    appFiles: { [key: string]: Folder };
  }> {
    return this.http.get<{
      appFiles: { [key: string]: Folder };
    }>(`${this.baseUrl}/${porjectId}/read`);
  }

  getProjectV2(porjectId: string): Observable<{
    appFiles: { [key: string]: Folder };
  }> {
    return this.http.get<{
      appFiles: { [key: string]: Folder };
    }>(`${this.baseUrl}/${porjectId}/read/v2`);
  }

  getFileProjectContent(
    projectId: string,
    path: string
  ): Observable<{ content: string }> {
    return this.http.get<{ content: string }>(
      `${this.baseUrl}/${projectId}/read/file?path=${path}`
    );
  }

  getProjectByUniqueName(uniqueName: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/unique-name/${uniqueName}`);
  }
}
