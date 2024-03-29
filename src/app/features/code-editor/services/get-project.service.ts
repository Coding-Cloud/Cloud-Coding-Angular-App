import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from '../types/folder.interface';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProjectService {
  private baseUrl = `${env.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProject(porjectId: string): Observable<{
    appFiles: { [key: string]: Folder };
  }> {
    return this.http.get<{
      appFiles: { [key: string]: Folder };
    }>(`${this.baseUrl}/${porjectId}/read`);
  }
}
