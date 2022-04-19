import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectListRoutingModule } from './project-list-routing.module';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [CommonModule, SharedModule, ProjectListRoutingModule]
})
export class ProjectListModule {}
