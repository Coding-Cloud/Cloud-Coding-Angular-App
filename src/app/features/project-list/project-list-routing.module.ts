import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AuthGuardService } from '../../core/core.module';

export const projectListNavigation: NavigationLinks = {
  projectList: {
    path: '',
    name: 'Projets'
  }
};

const routes: Routes = [
  {
    path: projectListNavigation.projectList.path,
    canActivate: [AuthGuardService],
    component: ProjectListComponent,
    data: { title: projectListNavigation.projectList.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectListRoutingModule {}
