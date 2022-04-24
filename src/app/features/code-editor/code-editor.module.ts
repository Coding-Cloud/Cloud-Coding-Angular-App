import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMonacoTreeModule } from '../monaco-tree/ngx-monaco-tree.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { CodeEditorRoutingModule } from './code-editor-routing.module';

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
  declarations: [CodeEditorComponent, TerminalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxMonacoTreeModule,
    MonacoEditorModule.forRoot(monacoConfig),
    CodeEditorRoutingModule
  ]
})
export class CodeEditorModule {}
