import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, NavigationLinks2 } from '../../app-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AuthGuardService } from '../../core/core.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectViewComponent } from './project-view/project-view.component';

export const projectsNavigation: NavigationLinks2<
  'projectList' | 'newProject' | 'viewProject'
> = {
  projectList: {
    path: '',
    name: 'Projets'
  },
  newProject: {
    path: 'new',
    name: 'Nouveau projet'
  },
  viewProject: {
    path: 'view',
    name: 'Projet'
  }
};

const routes: Routes = [
  {
    path: projectsNavigation.projectList.path,
    canActivate: [AuthGuardService],
    component: ProjectListComponent,
    data: { title: projectsNavigation.projectList.name }
  },
  {
    path: projectsNavigation.newProject.path,
    canActivate: [AuthGuardService],
    component: ProjectAddComponent,
    data: { title: projectsNavigation.newProject.name }
  },
  {
    path: projectsNavigation.viewProject.path + '/:id',
    canActivate: [AuthGuardService],
    component: ProjectViewComponent,
    data: { title: projectsNavigation.viewProject.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
