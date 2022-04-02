import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { FeatureListComponent } from './feature-list/feature-list.component';

export const featureListNavigation: NavigationLinks = {
  featureList: {
    path: '',
    name: 'Feature List'
  }
};

const routes: Routes = [
  {
    path: featureListNavigation.featureList.path,
    component: FeatureListComponent,
    data: { title: featureListNavigation.featureList.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureListRoutingModule {}
