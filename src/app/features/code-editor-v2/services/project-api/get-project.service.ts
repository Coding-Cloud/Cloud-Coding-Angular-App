import { Injectable } from '@angular/core';
import { environment as env } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectDto } from '../dto/project-dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetProjectService {
  private baseUrl = `${env.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  // get Project By unique-name
  getProjectIdByUniqueName(
    projectId: string
  ): Observable<{ projectId: string; groupId: string }> {
    return this.http
      .get<ProjectDto>(`${this.baseUrl}/unique-name/${projectId}`)
      .pipe(
        map((project: ProjectDto) => ({
          projectId: project.id,
          groupId: project.groupId
        }))
      );
  }
}
