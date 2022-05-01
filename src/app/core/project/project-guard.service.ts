import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '../notifications/notification.service';
import { navigation } from '../../app-routing.module';
import { GetProjectService } from 'src/app/features/code-editor-v2/services/get-project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectsService } from '../../features/projects/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuardService implements CanActivate {
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const id = route.paramMap.get('id');
    if (!id) {
      this.router.navigate([navigation.home.path]);
      return false;
    }
    return this.projectsService.getProjectByUniqueName(id).pipe(
      map((project) => {
        if (!project) {
          this.notificationService.error(
            'Vous ne pouvez pas accéder à ce projet'
          );
          this.router.navigate([navigation.home.path]);
          return false;
        } else {
          return true;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.router.navigate([navigation.home.path]);
        this.notificationService.error(
          'Vous ne pouvez pas accéder à ce projet'
        );
        return of(false);
      })
    );
  }
}
