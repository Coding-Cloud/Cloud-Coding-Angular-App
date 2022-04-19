import { Pipe, PipeTransform } from '@angular/core';
import { ProjectLanguage } from '../models/project.model';

@Pipe({
  name: 'projectLanguage'
})
export class ProjectLanguagePipe implements PipeTransform {
  transform(value: ProjectLanguage, ..._args: unknown[]): string {
    switch (value) {
      case ProjectLanguage.ANGULAR:
        return 'Angular';
      case ProjectLanguage.REACT:
        return 'React';
      default:
        return 'Inconnu';
    }
  }
}
