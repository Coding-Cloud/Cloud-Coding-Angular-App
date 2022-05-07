import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { AuthGuardService } from '../../core/core.module';
import { ConversationListComponent } from './conversation-list/conversation-list.component';

export const conversationsNavigation: NavigationLinks = {
  groupList: {
    path: '',
    name: 'Conversations'
  }
};

const routes: Routes = [
  {
    path: conversationsNavigation.groupList.path,
    canActivate: [AuthGuardService],
    component: ConversationListComponent,
    data: { title: conversationsNavigation.groupList.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule {}
