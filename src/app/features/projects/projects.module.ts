import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectSearchDialogComponent } from './project-search-dialog/project-search-dialog.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { CommentsModule } from '../social/comments/comments.module';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectAddComponent,
    ProjectViewComponent,
    ProjectEditComponent,
    ProjectSearchDialogComponent,
    ProjectSearchComponent
  ],
  exports: [ProjectSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
    MatButtonToggleModule,
    CommentsModule
  ]
})
export class ProjectsModule {}
