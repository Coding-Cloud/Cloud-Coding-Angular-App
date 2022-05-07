import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { extensions } from '../../utils/extension-icon';
import { files } from '../../utils/file-icon';
import { folders } from '../../utils/folder-icon';
import { MonacoTreeElement } from '../ngx-monaco-tree.type';
import {
  ContextMenuElementSeparator,
  ContextMenuElementText
} from '../monaco-tree-context-menu/monaco-tree-context-menu.type';
import { ContextMenuAction } from './monaco-tree-file.type';
import { NotificationService } from '../../../core/notifications/notification.service';

function getAbsolutePosition(element: any) {
  const r = { x: element.offsetLeft, y: element.offsetTop };
  if (element.offsetParent) {
    const tmp = getAbsolutePosition(element.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  return r;
}

@Component({
  selector: 'monaco-tree-file',
  templateUrl: './monaco-tree-file.component.html',
  styleUrls: ['./monaco-tree-file.component.scss']
})
export class MonacoTreeFileComponent implements OnInit {
  @Input() name = '';
  @Input() content: MonacoTreeElement[] | undefined | null = undefined;
  @Input() depth = 0;
  @Input() theme: 'vs-dark' | 'vs-light' = 'vs-dark';
  @Input() hide = false;
  @Input() edited: boolean | undefined;
  @Input() rename: boolean | undefined;
  @Input() row: any;

  @Output() clickFile = new EventEmitter<string>();
  @Output() contextMenuClick = new EventEmitter<ContextMenuAction>();
  @Output() createFile = new EventEmitter<{ path: string; nameFile: string }>();
  @Output() createImage = new EventEmitter<{ path: string; name: string }>();
  @Output() createDir = new EventEmitter<{ path: string; nameDir: string }>();
  @Output() renameFolder = new EventEmitter<{
    path: string;
    newName: string;
  }>();

  open = false;
  position: [number, number] | undefined = undefined;
  type: 'file' | 'dir' | undefined = 'dir';

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    const nameSplit = this.name.split('/');
    if (nameSplit[nameSplit.length - 1].includes('.')) {
      this.type = 'file';
    } else {
      this.type = 'dir';
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  contextMenuDir: Array<ContextMenuElementSeparator | ContextMenuElementText> =
    [
      {
        type: 'element',
        name: 'New File',
        action: () => {
          this.contextMenuClick.emit({
            action: 'new_file',
            name: this.name,
            type: 'dir'
          });
          this.position = [-1000, -1000];
        }
      },
      {
        type: 'element',
        name: 'New Directory',
        action: () => {
          this.contextMenuClick.emit({
            action: 'new_directory',
            name: this.name,
            type: 'dir'
          });
          this.position = [-1000, -1000];
        }
      },
      {
        type: 'element',
        name: 'Upload picture',
        action: () => {
          this.contextMenuClick.emit({
            action: 'upload_picture',
            name: this.name,
            type: 'dir'
          });
          this.position = [-1000, -1000];
        }
      },
      { type: 'separator' },
      {
        type: 'element',
        name: 'Rename',
        action: () => {
          this.contextMenuClick.emit({
            action: 'rename_file',
            name: this.name,
            type: 'dir'
          });
          this.position = [-1000, -1000];
        }
      },
      {
        type: 'element',
        name: 'Delete',
        action: () => {
          this.contextMenuClick.emit({
            action: 'delete_file',
            name: this.name,
            type: 'dir'
          });
          this.position = [-1000, -1000];
        }
      }
    ];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  contextMenuFile: Array<ContextMenuElementSeparator | ContextMenuElementText> =
    [
      {
        type: 'element',
        name: 'Rename',
        action: () => {
          this.contextMenuClick.emit({
            action: 'rename_file',
            name: this.name,
            type: 'file'
          });
          this.position = [-1000, -1000];
        }
      },
      {
        type: 'element',
        name: 'Delete',
        action: () => {
          this.contextMenuClick.emit({
            action: 'delete_file',
            name: this.name,
            type: 'file'
          });
          this.position = [-1000, -1000];
        }
      }
    ];

  get icon() {
    if (this.folder) {
      if (Object.keys(folders).includes(this.name)) {
        const icon = folders[this.name as keyof typeof folders];
        if (this.open) return icon + '-open';
        else return icon;
      } else {
        if (this.open) return 'folder-open';
        else return 'folder';
      }
    } else {
      if (Object.keys(files).includes(this.name)) {
        return files[this.name as keyof typeof files];
      } else {
        let splited = this.name.split('.');
        while (splited.length > 0) {
          splited = splited.slice(1);
          const ext = splited.join('.');
          if (ext && Object.keys(extensions).includes(ext)) {
            return extensions[ext as keyof typeof extensions];
          }
        }
        return 'file';
      }
    }
  }

  toggle() {
    this.open = !this.open;
    this.clickFile.emit(this.name);
  }

  get style() {
    return 'margin-left: ' + 10 * this.depth + 'px';
  }

  get folder() {
    return this.content !== null && this.content !== undefined;
  }

  handleClickFile(file: string) {
    this.clickFile.emit(this.name + '/' + file);
  }

  handleRightClickFile(event: MouseEvent) {
    event.preventDefault();
    const pos = getAbsolutePosition(event.target);
    this.position = [pos.x + event.offsetX, pos.y + event.offsetY];
  }

  handleFocusOut(row: any) {
    row.edited = false;
  }

  handleRenameFocusOut(row: any) {
    row.rename = false;
  }

  handleCreateKeyUp(event: any, row: any) {
    if (event.key === 'Enter') {
      const isFile = event.target.value.includes('.');
      this.edited = false;
      if (isFile === true) {
        this.createFile.emit({
          path: this.row.fullPath,
          nameFile: event.target.value
        });
      } else {
        console.log('tu emit');
        this.createDir.emit({
          path: this.row.fullPath,
          nameDir: event.target.value
        });
      }
    }
    console.log(event);
  }

  handleRenameKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.rename = false;
      this.renameFolder.emit({
        path: this.row.fullPath,
        newName: event.target.value
      });
    }
    console.log(event);
  }

  handleRightClick(event: ContextMenuAction) {
    this.contextMenuClick.emit({
      action: event.action,
      name: this.name + '/' + event.name,
      type: 'dir'
    });
  }

  @HostListener('document:contextmenu', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.position = [-1000, -1000];
    }
  }

  handleCreateFile(event: { path: string; nameFile: string }) {
    console.log('on est dans le create file');
    console.log(event);
    this.createFile.emit(event);
  }

  handleCreateDir(event: { path: string; nameDir: string }) {
    this.createDir.emit(event);
  }

  handleRenameFolder(event: { path: string; newName: string }) {
    this.renameFolder.emit(event);
  }

  handleCreateImage(event: { path: string; name: string }) {
    console.log('on est dans le create image');

    console.log(event);
    this.createImage.emit(event);
  }
}
