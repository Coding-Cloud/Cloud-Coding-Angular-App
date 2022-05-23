import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';
import { CommentViewComponent } from './comment-view/comment-view.component';

@NgModule({
  declarations: [
    CommentEditorComponent,
    CommentViewComponent,
    CustomMenuComponent
  ],
  exports: [CommentEditorComponent, CommentViewComponent],
  imports: [CommonModule, SharedModule, NgxEditorModule]
})
export class CommentsModule {}
