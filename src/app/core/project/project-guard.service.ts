import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of, Subscriber } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '../notifications/notification.service';
import { navigation } from '../../app-routing.module';
import { ProjectsService } from 'src/app/features/projects/projects.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    return this.projectsService.getProject(id).pipe(
      map((project) => {
        if (!project) {
          this.notificationService.error(
            'Vous ne pouvez pas accéder à ce projet'
          );
          console.log('problème');
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