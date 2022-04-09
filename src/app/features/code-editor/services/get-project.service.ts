import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Folder } from '../types/folder.interface';

@Injectable({
  providedIn: 'root'
})
export class GetProjectService {
  private baseUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProject(path: string): Observable<{
    appFiles: { [key: string]: Folder };
  }> {
    return this.http.get<{
      appFiles: { [key: string]: Folder };
    }>(`${this.baseUrl}?path=${path}`);
  }
}
