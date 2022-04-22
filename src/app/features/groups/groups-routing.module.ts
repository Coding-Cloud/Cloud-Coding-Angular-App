import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { AuthGuardService } from '../../core/core.module';
import { GroupListComponent } from './group-list/group-list.component';

export const groupsNavigation: NavigationLinks = {
  groupList: {
    path: '',
    name: 'Groupes'
  }
};

const routes: Routes = [
  {
    path: groupsNavigation.groupList.path,
    canActivate: [AuthGuardService],
    component: GroupListComponent,
    data: { title: groupsNavigation.groupList.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
