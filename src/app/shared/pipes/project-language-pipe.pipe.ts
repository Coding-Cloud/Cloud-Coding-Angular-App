import { Pipe, PipeTransform } from '@angular/core';
import { ProjectLanguage } from '../models/project.model';

@Pipe({
  name: 'projectLanguage'
})
export class ProjectLanguagePipe implements PipeTransform {
  transform(value?: ProjectLanguage, ..._args: unknown[]): string {
    switch (value) {
      case ProjectLanguage.CC:
      case ProjectLanguage.ANGULAR:
        return 'Angular - 14';
      case ProjectLanguage.REACT:
        return 'React - 17';
      case ProjectLanguage.QUARKUS:
        return 'Quarkus - 17';
      case ProjectLanguage.NESTJS:
        return 'NestJS - 8';
      case ProjectLanguage.FLASK:
        return 'Flask - 2';
      default:
        return 'Inconnu';
    }
  }
}
