import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { AuthGuardService } from '../../core/core.module';
import { UserViewComponent } from './user-view/user-view.component';

export const usersNavigation: NavigationLinks = {
  viewUser: {
    path: 'view',
    name: 'Utilisateur'
  }
};

const routes: Routes = [
  {
    path: usersNavigation.viewUser.path + '/:id',
    canActivate: [AuthGuardService],
    component: UserViewComponent,
    data: {
      title: usersNavigation.viewUser.name
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
