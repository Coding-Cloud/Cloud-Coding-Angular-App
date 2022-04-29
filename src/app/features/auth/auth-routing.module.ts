import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationLinks } from '../../app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authNavigation: NavigationLinks = {
  login: {
    path: 'login',
    name: 'Connexion'
  },
  register: {
    path: 'register',
    name: 'Inscription'
  }
};

const routes: Routes = [
  {
    path: '',
    redirectTo: authNavigation.login.path,
    pathMatch: 'full'
  },
  {
    path: authNavigation.login.path,
    component: LoginComponent,
    data: { title: authNavigation.login.name }
  },
  {
    path: authNavigation.register.path,
    component: RegisterComponent,
    data: { title: authNavigation.register.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
