import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navigation, NavigationLinks2 } from '../../../app-routing.module';
import { AuthGuardService } from '../../../core/core.module';
import { UserViewComponent } from './user-view/user-view.component';
import { socialNavigation } from '../social-routing.module';
import { UserSearchComponent } from './user-search/user-search.component';

export const usersNavigation: NavigationLinks2<'view' | 'search'> = {
  view: {
    path: 'view',
    name: 'Utilisateur'
  },
  search: {
    path: '',
    name: 'Rechercher un utilisateur'
  }
};

export const userViewLink = `/${navigation.social.path}/${socialNavigation.users.path}/${usersNavigation.view.path}`;

const routes: Routes = [
  {
    path: usersNavigation.view.path + '/:id',
    canActivate: [AuthGuardService],
    component: UserViewComponent,
    data: {
      title: usersNavigation.view.name
    }
  },
  {
    path: usersNavigation.search.path,
    canActivate: [AuthGuardService],
    component: UserSearchComponent,
    data: {
      title: usersNavigation.search.name
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
