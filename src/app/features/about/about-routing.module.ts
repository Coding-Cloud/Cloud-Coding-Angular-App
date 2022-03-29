import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { NavigationLinks } from '../../app-routing.module';

export const aboutNavigation: NavigationLinks = {
  about: {
    path: '',
    name: 'About'
  }
};

const routes: Routes = [
  {
    path: aboutNavigation.about.path,
    component: AboutComponent,
    data: { title: aboutNavigation.about.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
