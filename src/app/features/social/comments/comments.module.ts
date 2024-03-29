import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';
import { CommentViewComponent } from './comment-view/comment-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CommentEditorComponent,
    CommentViewComponent,
    CustomMenuComponent
  ],
  exports: [CommentEditorComponent, CommentViewComponent, CustomMenuComponent],
  imports: [CommonModule, SharedModule, NgxEditorModule, RouterModule]
})
export class CommentsModule {}
