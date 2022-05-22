import { NavigationLinks2 } from '../../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../../core/core.module';
import { SocialHomeComponent } from './social-home/social-home.component';

export const socialNavigation: NavigationLinks2<'social' | 'users'> = {
  social: {
    path: '',
    name: 'Réseau'
  },
  users: {
    path: 'users',
    name: 'Utilisateurs'
  }
};

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule {}
