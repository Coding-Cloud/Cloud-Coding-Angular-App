import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectAddComponent,
    ProjectViewComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
    MatButtonToggleModule
  ]
})
export class ProjectsModule {}
