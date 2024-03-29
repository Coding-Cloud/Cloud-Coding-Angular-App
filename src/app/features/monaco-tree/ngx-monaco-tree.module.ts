import { NgModule } from '@angular/core';
import { MonacoTreeFileComponent } from './monaco-tree-file/monaco-tree-file.component';
import { NgxMonacoTreeComponent } from './ngx-monaco-tree.component';
import { MonacoTreeContextMenuComponent } from './monaco-tree-context-menu/monaco-tree-context-menu.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NgxMonacoTreeComponent,
    MonacoTreeFileComponent,
    MonacoTreeContextMenuComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [NgxMonacoTreeComponent]
})
export class NgxMonacoTreeModule {}
