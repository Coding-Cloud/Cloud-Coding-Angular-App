import { Pipe, PipeTransform } from '@angular/core';
import { ProjectsService } from '../../features/projects/projects.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'projectName'
})
export class ProjectNamePipe implements PipeTransform {
  constructor(private projectService: ProjectsService) {}

  transform(projectId?: string, ..._args: unknown[]): Observable<string> {
    if (!projectId) {
      return of('');
    }
    return this.projectService
      .getProjectName(projectId)
      .pipe(map((response) => response.name));
  }
}
