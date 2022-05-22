import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navigation, NavigationLinks2 } from '../../../app-routing.module';
import { AuthGuardService } from '../../../core/core.module';
import { UserViewComponent } from './user-view/user-view.component';
import { socialNavigation } from '../social-routing.module';

export const usersNavigation: NavigationLinks2<'view'> = {
  view: {
    path: 'view',
    name: 'Utilisateur'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
