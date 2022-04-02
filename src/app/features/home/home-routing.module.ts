import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationLinks } from '../../app-routing.module';
import { HomeComponent } from './home/home.component';

export const homeNavigation: NavigationLinks = {
  home: {
    path: '',
    name: 'Accueil'
  }
};

const routes: Routes = [
  {
    path: homeNavigation.home.path,
    component: HomeComponent,
    data: { title: homeNavigation.home.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
