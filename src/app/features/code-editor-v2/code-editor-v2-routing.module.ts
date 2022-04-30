import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectGuardService } from 'src/app/core/core.module';
import { NavigationLinks } from '../../app-routing.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';

export const codeEditorNavigation: NavigationLinks = {
  codeEditor: {
    path: '',
    name: 'CodeEditor'
  },
  projectCodeEditor: {
    path: 'project',
    name: 'projet'
  }
};

export const codeEditorRoutes: Routes = [
  {
    path: codeEditorNavigation.codeEditor.path,
    component: CodeEditorComponent,
    data: { title: codeEditorNavigation.codeEditor.name }
  },
  {
    path: codeEditorNavigation.projectCodeEditor.path + '/:id',
    canActivate: [ProjectGuardService],
    component: CodeEditorComponent,
    data: { title: codeEditorNavigation.codeEditor.name }
  }
];

@NgModule({
  imports: [RouterModule.forChild(codeEditorRoutes)],
  exports: [RouterModule]
})
export class CodeEditorV2RoutingModule {}
