import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export interface Link {
  path: string;
  name: string;
  auth?: boolean;
}

export interface NavigationLinks {
  [key: string]: Link;
}

export type NavigationLinks2<T extends string> = {
  [key in T]: Link;
};

export const navigation: NavigationLinks2<
  | 'home'
  | 'features'
  | 'settings'
  | 'examples'
  | 'projets'
  | 'groups'
  | 'auth'
  | 'codeEditor'
  | 'social'
> = {
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
  },
  projets: {
    name: 'Projets',
    path: 'projects',
    auth: true
  },
  groups: {
    name: 'Groupes',
    path: 'groups',
    auth: true
  },
  auth: {
    name: 'Authentification',
    path: 'auth'
  },
  codeEditor: {
    name: 'Code Editor',
    path: 'code-editor'
  },
  social: {
    name: 'Social',
    path: 'social',
    auth: true
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
      import('./features/home/home.module').then((m) => m.HomeModule)
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
    path: navigation.projets.path,
    loadChildren: () =>
      import('./features/projects/projects.module').then(
        (m) => m.ProjectsModule
      )
  },
  {
    path: navigation.groups.path,
    loadChildren: () =>
      import('./features/groups/groups.module').then((m) => m.GroupsModule)
  },
  {
    path: navigation.social.path,
    loadChildren: () =>
      import('./features/social/social.module').then((m) => m.SocialModule)
  },

  {
    path: navigation.auth.path,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: navigation.codeEditor.path,
    loadChildren: () =>
      import('./features/code-editor-v2/code-editor-v2.module').then(
        (m) => m.CodeEditorV2Module
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
