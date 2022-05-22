import { navigation, NavigationLinks2 } from '../../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../../core/core.module';
import { SocialHomeComponent } from './social-home/social-home.component';
import { ProjectSearchComponent } from '../projects/project-search/project-search.component';
import { ProjectsModule } from '../projects/projects.module';

export const socialNavigation: NavigationLinks2<
  'social' | 'users' | 'projects'
> = {
  social: {
    path: '',
    name: 'Réseau'
  },
  users: {
    path: 'users',
    name: 'Utilisateurs'
  },
  projects: {
    path: 'projects',
    name: 'Projets'
  }
};

export const socialUsersLink = `/${navigation.social.path}/${socialNavigation.users.path}`;
export const socialProjectsLink = `/${navigation.social.path}/${socialNavigation.projects.path}`;

const routes: Routes = [
  {
    path: socialNavigation.social.path,
    canActivate: [AuthGuardService],
    component: SocialHomeComponent,
    data: {
      title: socialNavigation.social.name
    }
  },
  {
    path: socialNavigation.users.path,
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    data: {
      title: socialNavigation.users.name
    }
  },
  {
    path: socialNavigation.projects.path,
    canActivate: [AuthGuardService],
    component: ProjectSearchComponent,
    data: {
      title: socialNavigation.projects.name
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule {}
