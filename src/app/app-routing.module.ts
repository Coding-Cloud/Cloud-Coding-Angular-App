import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

export interface Link {
  path: string;
  name: string;
  auth?: boolean;
}

export interface NavigationLinks {
  [key: string]: Link;
}

export const navigation: NavigationLinks = {
  home: {
    name: 'Accueil',
    path: 'home'
  },
  features: {
    name: 'Fonctionnalités',
    path: 'features'
  },
  settings: {
    name: 'Paramètres',
    path: 'settings'
  },
  examples: {
    name: 'Exemples',
    path: 'examples'
  }
};

const routes: Routes = [
  {
    path: '',
    redirectTo: navigation.home.path,
    pathMatch: 'full'
  },
  {
    path: navigation.home.path,
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule)
  },
  {
    path: navigation.features.path,
    loadChildren: () =>
      import('./features/feature-list/feature-list.module').then(
        (m) => m.FeatureListModule
      )
  },
  {
    path: navigation.settings.path,
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      )
  },
  {
    path: navigation.examples.path,
    loadChildren: () =>
      import('./features/examples/examples.module').then(
        (m) => m.ExamplesModule
      )
  },
  {
    path: '**',
    redirectTo: navigation.home.path
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
