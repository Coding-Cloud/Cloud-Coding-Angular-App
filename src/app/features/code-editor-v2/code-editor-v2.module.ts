import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMonacoTreeModule } from '../monaco-tree/ngx-monaco-tree.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { TerminalComponent } from './components/code-editor/components/terminal/terminal.component';
import { CodeEditorV2RoutingModule } from './code-editor-v2-routing.module';
import { EditorPictureComponent } from './components/code-editor/components/editor-picture/editor-picture.component';
import { DeveloperListComponent } from './components/code-editor/components/developer-list/developer-list.component';
import { FrontViewComponent } from './components/code-editor/components/front-view/front-view.component';
import { ResizableModule } from 'angular-resizable-element';

const monacoConfig: NgxMonacoEditorConfig = {
  /* defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used*/
  onMonacoLoad: () => {
    (
      window as any
    ).monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true
    });

    (window as any).monaco.quickSuggestions = false;
  } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    CodeEditorComponent,
    TerminalComponent,
    EditorPictureComponent,
    DeveloperListComponent,
    FrontViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMonacoTreeModule,
    MonacoEditorModule.forRoot(monacoConfig),
    CodeEditorV2RoutingModule,
    ResizableModule
  ]
})
export class CodeEditorV2Module {}
