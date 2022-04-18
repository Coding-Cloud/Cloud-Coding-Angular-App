import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoTreeFileComponent } from './monaco-tree-file/monaco-tree-file.component';
import { NgxMonacoTreeComponent } from './ngx-monaco-tree.component';
import { MonacoTreeContextMenuComponent } from './monaco-tree-context-menu/monaco-tree-context-menu.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NgxMonacoTreeComponent,
    MonacoTreeFileComponent,
    MonacoTreeContextMenuComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [NgxMonacoTreeComponent]
})
export class NgxMonacoTreeModule {}
