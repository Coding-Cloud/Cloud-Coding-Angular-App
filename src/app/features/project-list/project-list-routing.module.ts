import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AuthGuardService } from '../../core/core.module';
import { ProjectAddComponent } from './project-add/project-add.component';

export const projectListNavigation: NavigationLinks = {
  projectList: {
    path: '',
    name: 'Projets'
  },
  newProject: {
    path: 'new',
    name: 'Nouveau projet'
  }
};

const routes: Routes = [
  {
    path: projectListNavigation.projectList.path,
    canActivate: [AuthGuardService],
    component: ProjectListComponent,
    data: { title: projectListNavigation.projectList.name }
  },
  {
    path: projectListNavigation.newProject.path,
    canActivate: [AuthGuardService],
    component: ProjectAddComponent,
    data: { title: projectListNavigation.newProject.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectListRoutingModule {}
