import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MonacoTreeElement } from './ngx-monaco-tree.type';
import { ContextMenuAction } from './monaco-tree-file/monaco-tree-file.type';
import {
  ContextMenuElementSeparator,
  ContextMenuElementText
} from './monaco-tree-context-menu/monaco-tree-context-menu.type';

@Component({
  selector: 'monaco-tree',
  templateUrl: './ngx-monaco-tree.component.html',
  styleUrls: ['./ngx-monaco-tree.component.scss']
})
export class NgxMonacoTreeComponent {
  @Input() theme: 'vs-dark' | 'vs-light' = 'vs-dark';
  @Input() tree: MonacoTreeElement[] = [];
  @Input() currentFile: string = '';
  @Input() width = '300px';
  @Input() height = '500px';

  @Output() clickFile = new EventEmitter<string>();
  @Output() clickContextMenu = new EventEmitter<ContextMenuAction>();
  @Output() createFile = new EventEmitter<{ path: string; nameFile: string }>();
  @Output() createDir = new EventEmitter<{ path: string; nameDir: string }>();
  @Output() renameFolder = new EventEmitter<{
    path: string;
    newName: string;
  }>();

  // @Output() contextMenuClick = new EventEmitter<ContextMenuAction>();

  // contextMenu: Array<ContextMenuElementSeparator|ContextMenuElementText> = [
  // 	{type: "element", name: 'New File', action: () => {
  // 		this.contextMenuClick.emit(["new_file", this.curr ?? ''])
  // 	} },
  // 	{type: "element", name: 'New Directory', action: () => {
  // 			this.contextMenuClick.emit(["new_directory", this.curr ?? ''])
  // 		} },
  // 	{type: "separator" },
  // 	{type: "element", name: 'Delete', action: () => {
  // 			this.contextMenuClick.emit(["delete_file", this.curr ?? ''])
  // 	} }
  // ]

  handleClickFile(path: string) {
    this.clickFile.emit(path);
  }

  handleClickContextMenu(event: ContextMenuAction) {
    console.log('je devrais passer là si on passe dans le handle');

    this.clickContextMenu.emit(event);
  }

  handleCreateFile(event: { path: string; nameFile: string }) {
    this.createFile.emit(event);
  }

  handleCreateDir(event: { path: string; nameDir: string }) {
    this.createDir.emit(event);
  }

  handleRenameFolder(event: { path: string; newName: string }) {
    this.renameFolder.emit(event);
  }
}
