import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus } from '../models/project.model';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {
  transform(value?: ProjectStatus, ..._args: unknown[]): string {
    switch (value) {
      case ProjectStatus.RUNNING:
        return 'En cours';
      case ProjectStatus.INACTIVE:
        return 'Inactif';
      case ProjectStatus.INITIALISING:
        return 'Initialisation';
      default:
        return 'Inconnu';
    }
  }
}
