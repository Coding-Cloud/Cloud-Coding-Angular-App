import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConversationModule } from '../../conversation/conversation.module';

@NgModule({
  declarations: [FriendListComponent, FriendRequestsComponent],
  exports: [FriendListComponent, FriendRequestsComponent],
  imports: [CommonModule, SharedModule, RouterModule, ConversationModule]
})
export class FriendshipsModule {}
