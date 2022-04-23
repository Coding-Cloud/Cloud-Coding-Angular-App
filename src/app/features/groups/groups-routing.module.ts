import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { AuthGuardService } from '../../core/core.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupAddComponent } from './group-add/group-add.component';

export const groupsNavigation: NavigationLinks = {
  groupList: {
    path: '',
    name: 'Groupes'
  },
  newGroup: {
    path: 'new',
    name: 'Nouveau groupe'
  },
  viewGroup: {
    path: 'view',
    name: 'Group'
  }
};

const routes: Routes = [
  {
    path: groupsNavigation.groupList.path,
    canActivate: [AuthGuardService],
    component: GroupListComponent,
    data: { title: groupsNavigation.groupList.name }
  },
  {
    path: groupsNavigation.newGroup.path,
    canActivate: [AuthGuardService],
    component: GroupAddComponent,
    data: { title: groupsNavigation.newGroup.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
