import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationLinks } from '../../app-routing.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';

export const codeEditorNavigation: NavigationLinks = {
  codeEditor: {
    path: '',
    name: 'CodeEditor'
  }
};

export const codeEditorRoutes: Routes = [
  {
    path: codeEditorNavigation.codeEditor.path,
    component: CodeEditorComponent,
    data: { title: codeEditorNavigation.codeEditor.name }
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(codeEditorRoutes)],
//   exports: [RouterModule]
// })
// export class CodeEditorRoutingModule {}
