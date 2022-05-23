import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { ProjectCommentEditorComponent } from './project-comment-editor/project-comment-editor.component';

@NgModule({
  declarations: [ProjectCommentEditorComponent],
  exports: [ProjectCommentEditorComponent],
  imports: [CommonModule, SharedModule, NgxEditorModule]
})
export class CommentsModule {}
