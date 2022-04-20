import { Pipe, PipeTransform } from '@angular/core';
import { ProjectVisibility } from '../models/project.model';

@Pipe({
  name: 'projectVisibility'
})
export class ProjectVisibilityPipe implements PipeTransform {
  transform(value?: ProjectVisibility, ..._args: unknown[]): string {
    switch (value) {
      case ProjectVisibility.GUEST:
        return 'Invité';
      case ProjectVisibility.PRIVATE:
        return 'Privé';
      case ProjectVisibility.PUBLIC:
        return 'Public';
      default:
        return 'Inconnu';
    }
  }
}
