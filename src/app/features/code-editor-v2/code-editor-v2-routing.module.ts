import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectGuardService } from 'src/app/core/core.module';
import { NavigationLinks } from '../../app-routing.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { CameraCallComponent } from './components/code-editor/components/camera-call/camera-call.component';

export const codeEditorNavigation: NavigationLinks = {
  camera: {
    path: 'camera',
    name: 'camera'
  },
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
    path: codeEditorNavigation.camera.path,
    component: CameraCallComponent,
    data: { title: codeEditorNavigation.camera.name }
  },
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
