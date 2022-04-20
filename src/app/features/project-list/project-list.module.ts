import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [ProjectListComponent, ProjectAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectListRoutingModule,
    MatButtonToggleModule
  ]
})
export class ProjectListModule {}
