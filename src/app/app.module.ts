import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { CodeEditorComponent } from './features/code-editor/components/code-editor/code-editor.component';
import { NgxMonacoTreeModule } from './features/monaco-tree/ngx-monaco-tree.module';
import { TerminalComponent } from './features/code-editor/components/terminal/terminal.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

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

registerLocaleData(localeFr);

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
  declarations: [AppComponent, CodeEditorComponent, TerminalComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
