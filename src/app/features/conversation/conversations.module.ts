import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationsRoutingModule } from './conversations-routing.module';

@NgModule({
  declarations: [ConversationListComponent],
  imports: [CommonModule, SharedModule, ConversationsRoutingModule]
})
export class ConversationsModule {}
