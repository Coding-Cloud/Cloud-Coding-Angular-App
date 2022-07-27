import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MonacoTreeElement } from './ngx-monaco-tree.type';
import { ContextMenuAction } from './monaco-tree-file/monaco-tree-file.type';
import {
  ContextMenuElementSeparator,
  ContextMenuElementText
} from './monaco-tree-context-menu/monaco-tree-context-menu.type';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'monaco-tree',
  templateUrl: './ngx-monaco-tree.component.html',
  styleUrls: ['./ngx-monaco-tree.component.scss']
})
export class NgxMonacoTreeComponent {
  @Input() theme: 'vs-dark' | 'vs-light' = 'vs-dark';
  @Input() tree: MonacoTreeElement[] = [];
  @Input() currentFile = '';
  @Input() width = '300px';
  @Input() height = '500px';
  @Input() hide = false;
  @Input() projectUniqueName = '';

  @Output() clickFile = new EventEmitter<string>();
  @Output() clickContextMenu = new EventEmitter<ContextMenuAction>();
  @Output() createFile = new EventEmitter<{ path: string; nameFile: string }>();
  @Output() createImage = new EventEmitter<{ path: string; name: string }>();
  @Output() createDir = new EventEmitter<{ path: string; nameDir: string }>();
  @Output() renameFolder = new EventEmitter<{
    path: string;
    newName: string;
  }>();

  @ViewChild('myInput') public myInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  readonly baseProjectPath = environment.baseProjectPath;

  // for test create folder at root
  monacoTreeElement: MonacoTreeElement = {
    name: '/',
    fullPath: '/',
    content: [],
    edited: false,
    rename: new BehaviorSubject<boolean>(false)
  };
  position: [number, number] | undefined = undefined;

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
  contextMenuDir: Array<ContextMenuElementSeparator | ContextMenuElementText> =
    [
      {
        type: 'element',
        name: 'New File',
        action: () => {
          this.monacoTreeElement.edited = true;
          this.position = [-1000, -1000];
        }
      },
      {
        type: 'element',
        name: 'New Directory',
        action: () => {
          this.monacoTreeElement.edited = true;
          this.position = [-1000, -1000];
        }
      }
    ];

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

  handleCreateImage(event: { path: string; name: string }) {
    console.log('je suis dans le ngrx');
    this.createImage.emit(event);
  }

  handleCreateDir(event: { path: string; nameDir: string }) {
    this.createDir.emit(event);
  }

  handleRenameFolder(event: { path: string; newName: string }) {
    this.renameFolder.emit(event);
  }

  handleRightClickFile(event: MouseEvent) {
    event.preventDefault();
    const pos = this.getAbsolutePosition(event.target);
    this.position = [pos.x + event.offsetX, pos.y + event.offsetY];
    console.log(event);
  }

  handleFocusOut(row: any) {
    row.edited = false;
  }

  handleCreateKeyUp(event: any, row: any) {
    if (event.key === 'Enter') {
      const isFile = event.target.value.includes('.');
      // this.edited = false;
      if (isFile === true) {
        this.createFile.emit({
          path: `${this.baseProjectPath}${this.projectUniqueName}`,
          nameFile: event.target.value
        });
      } else {
        console.log('tu emit');
        this.createDir.emit({
          path: `${this.baseProjectPath}${this.projectUniqueName}`,
          nameDir: event.target.value
        });
      }
      this.myInput?.nativeElement.blur();
    }
    console.log(event);
  }

  private getAbsolutePosition(element: any) {
    const r = { x: element.offsetLeft, y: element.offsetTop };
    if (element.offsetParent) {
      const tmp = this.getAbsolutePosition(element.offsetParent);
      r.x += tmp.x;
      r.y += tmp.y;
    }
    return r;
  }
}
