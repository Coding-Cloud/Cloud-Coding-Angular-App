import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { NgxMonacoTreeModule } from 'ngx-monaco-tree';
import { CodeEditorComponent } from './features/code-editor/components/code-editor/code-editor.component';

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
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    MonacoEditorModule.forRoot(monacoConfig),
    NgxMonacoTreeModule
  ],
  declarations: [AppComponent, CodeEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
