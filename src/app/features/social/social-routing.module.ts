import { navigation, NavigationLinks2 } from '../../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../../core/core.module';
import { SocialHomeComponent } from './social-home/social-home.component';
import { ProjectSearchComponent } from '../projects/project-search/project-search.component';
import { FriendListComponent } from './friendships/friend-list/friend-list.component';
import { FriendRequestsComponent } from './friendships/friend-requests/friend-requests.component';

export const socialNavigation: NavigationLinks2<
  'social' | 'users' | 'projects' | 'friendships' | 'friendRequests'
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
  },
  friendRequests: {
    path: 'friend-requests',
    name: "Demandes d'amitié"
  },
  friendships: {
    path: 'friendships',
    name: 'Amis'
  }
};

export const socialUsersLink = `/${navigation.social.path}/${socialNavigation.users.path}`;
export const socialProjectsLink = `/${navigation.social.path}/${socialNavigation.projects.path}`;
export const socialFriendshipsLink = `/${navigation.social.path}/${socialNavigation.friendships.path}`;
export const socialFriendRequestsLink = `/${navigation.social.path}/${socialNavigation.friendRequests.path}`;

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
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule)
  },
  {
    path: socialNavigation.projects.path,
    canActivate: [AuthGuardService],
    component: ProjectSearchComponent,
    data: {
      title: socialNavigation.projects.name
    }
  },
  {
    path: socialNavigation.friendships.path,
    canActivate: [AuthGuardService],
    component: FriendListComponent,
    data: {
      title: socialNavigation.friendships.name
    }
  },
  {
    path: socialNavigation.friendRequests.path,
    canActivate: [AuthGuardService],
    component: FriendRequestsComponent,
    data: {
      title: socialNavigation.friendRequests.name
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule {}
