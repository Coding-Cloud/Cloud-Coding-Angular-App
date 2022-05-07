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
  users: {
    name: 'Utilisateurs',
    path: 'users',
    auth: true
  },
  conversations: {
    name: 'Conversations',
    path: 'conversations',
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
    path: navigation.users.path,
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule)
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
    path: navigation.conversations.path,
    loadChildren: () =>
      import('./features/conversation/conversations.module').then(
        (m) => m.ConversationsModule
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
