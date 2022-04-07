import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationLinks } from '../../app-routing.module';
import { CodeEdtorComponent } from './components/code-edtor/code-edtor.component';

export const codeEditorNavigation: NavigationLinks = {
  codeEditor: {
    path: '',
    name: 'CodeEditor'
  }
};

export const codeEditorRoutes: Routes = [
  {
    path: codeEditorNavigation.codeEditor.path,
    component: CodeEdtorComponent,
    data: { title: codeEditorNavigation.codeEditor.name }
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(codeEditorRoutes)],
//   exports: [RouterModule]
// })
// export class CodeEditorRoutingModule {}
