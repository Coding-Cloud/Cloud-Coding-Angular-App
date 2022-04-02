import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { ExamplesComponent } from './examples/examples.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { NavigationLinks } from '../../app-routing.module';

export const examplesNavigation: NavigationLinks = {
  todos: {
    path: 'todos',
    name: 'Todos'
  },
  crud: {
    path: 'crud',
    name: 'CRUD'
  },
  form: {
    path: 'form',
    name: 'Form'
  },
  notifications: {
    path: 'notifications',
    name: 'Notifications'
  },
  authenticated: {
    path: 'authenticated',
    name: 'Authenticated',
    auth: true
  }
};

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: examplesNavigation.todos.path,
        pathMatch: 'full'
      },
      {
        path: examplesNavigation.todos.path,
        component: TodosContainerComponent,
        data: { title: examplesNavigation.todos.name }
      },
      {
        path: examplesNavigation.crud.path,
        redirectTo: examplesNavigation.crud.path + '/',
        pathMatch: 'full'
      },
      {
        path: examplesNavigation.crud.path + '/:id',
        component: CrudComponent,
        data: { title: examplesNavigation.crud.name }
      },
      {
        path: examplesNavigation.form.path,
        component: FormComponent,
        data: { title: examplesNavigation.form.name }
      },
      {
        path: examplesNavigation.notifications.path,
        component: NotificationsComponent,
        data: { title: examplesNavigation.notifications.name }
      },
      {
        path: examplesNavigation.authenticated.path,
        component: AuthenticatedComponent,
        canActivate: [AuthGuardService],
        data: { title: examplesNavigation.authenticated.name }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
