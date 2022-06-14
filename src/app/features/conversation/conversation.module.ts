import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageViewComponent } from './message-view/message-view.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { MessageEditorComponent } from './message-editor/message-editor.component';
import { CommentsModule } from '../social/comments/comments.module';
import { MessageListComponent } from './message-list/message-list.component';

@NgModule({
  declarations: [
    MessageViewComponent,
    MessageEditorComponent,
    MessageListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgxEditorModule,
    CommentsModule
  ]
})
export class ConversationModule {}
