import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsContainerComponent } from './settings/settings-container.component';
import { NavigationLinks } from '../../app-routing.module';

export const settingsNavigation: NavigationLinks = {
  settings: {
    path: '',
    name: 'Paramètres'
  }
};

const routes: Routes = [
  {
    path: settingsNavigation.settings.path,
    component: SettingsContainerComponent,
    data: { title: settingsNavigation.settings.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
