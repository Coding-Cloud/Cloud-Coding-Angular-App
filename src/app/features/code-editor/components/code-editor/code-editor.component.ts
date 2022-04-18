import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { ContextMenuAction } from 'src/app/features/monaco-tree/monaco-tree-file/monaco-tree-file.type';
import { MonacoTreeElement } from 'src/app/features/monaco-tree/ngx-monaco-tree.type';
import { CodeSocketService } from '../../services/code-socket.service';
import { EditProjectDTO } from '../../services/dto/edit-project-dto';
import { GetProjectService } from '../../services/get-project.service';
import { UpdateProjectService } from '../../services/update-project.service';
import { Folder, FolderStatus } from '../../types/folder.interface';
import { Project } from '../../types/project.interface';
import { copyObject } from './utils/copy-object.utils';
import { EditProjectUtils } from './utils/edit-project.utils';
import { TreeUtils } from './utils/tree.utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'typescript' };
  code = '';
  readonly BASE_PROJECT_PATH =
    '/Users/remy/Documents/ESGI/annee_4/projet_annuel/angular-copy-file/';
  //have to be get from back
  baseUrlPath = 'http://localhost:8000';
  baseUrlPathTrust: SafeResourceUrl;
  currentFile = '';

  tree: MonacoTreeElement[] = [];

  title = 'test-npx';
  hardProjectModification: Project = {
    appFiles: {}
  };

  currentProject: Project = {
    appFiles: {}
  };

  socketProjectModification: Project = {
    appFiles: {}
  };

  socketProject: Project = {
    appFiles: {}
  };

  monacoTreeInput: any;

  keyup$: Observable<any> | undefined;

  destroyKey = new Subject<void>();

  constructor(
    private updateProjectService: UpdateProjectService,
    private elementRef: ElementRef,
    private getProjectService: GetProjectService,
    private cd: ChangeDetectorRef,
    private codeSocketService: CodeSocketService,
    private sanitizer: DomSanitizer
  ) {
    this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrlPath
    );
  }

  ngOnInit(): void {
    this.getProjectService
      .getProject(
        '/Users/remy/Documents/ESGI/annee_4/projet_annuel/angular-copy-file'
      )
      .subscribe((project: Project) => {
        this.currentProject = copyObject<Project>(project);
        this.socketProject = copyObject<Project>(project);
        console.log(this.currentProject);

        this.initializeTreeFiles();
      });
    this.codeSocketService.connect();
    this.codeSocketService
      .listenProjectModification('projectModificationFromContributor')
      .subscribe((editsProjectDTO: EditProjectDTO[]) => {
        this.currentProject = EditProjectUtils.editProject(
          { ...this.currentProject },
          editsProjectDTO
        );

        if (this.currentProject.appFiles[`${this.currentFile}`]) {
          this.code =
            this.currentProject.appFiles[`${this.currentFile}`].contents;
        }
        TreeUtils.editTree(this.tree, this.BASE_PROJECT_PATH, editsProjectDTO);
        this.cd.markForCheck();
      });
  }

  initializeTreeFiles(): void {
    this.tree = TreeUtils.intiateTreeFromProject(
      this.BASE_PROJECT_PATH,
      this.currentProject
    );
    this.cd.markForCheck();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleClickOnFolder(event: string): void {
    if (
      this.currentProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`] !==
        undefined &&
      this.currentProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`]
        .contents !== ''
    ) {
      this.code =
        this.currentProject.appFiles[
          `${this.BASE_PROJECT_PATH}${event}`
        ].contents;
    } else {
      this.code = '';
    }
    this.currentFile = `${this.BASE_PROJECT_PATH}${event}`;
    if (this.currentFile.endsWith('.html')) {
      this.editorOptions = { theme: 'vs-dark', language: 'html' };
    } else if (
      this.currentFile.endsWith('.css') ||
      this.currentFile.endsWith('.scss')
    ) {
      this.editorOptions = { theme: 'vs-dark', language: 'css' };
    } else {
      this.editorOptions = { theme: 'vs-dark', language: 'typescript' };
    }
    // editOrOptionsIsModified, we have to wait the rerender of the component
    setTimeout(() => {
      this.initialiseInputListening();
    }, 500);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleChange($event: any): void {
    const newValue: Folder = {
      name: this.currentFile.split(this.BASE_PROJECT_PATH)[1],
      type: 'file',
      fullPath: this.currentFile,
      contents: $event,
      lastModified: Date.now(),
      folderStatus: FolderStatus.MODIFIED
    };
    this.hardProjectModification.appFiles[this.currentFile] = newValue;
    this.socketProjectModification.appFiles[this.currentFile] = {
      ...this.hardProjectModification.appFiles[this.currentFile]
    };

    this.currentProject.appFiles[this.currentFile] = newValue;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleSave(): void {
    this.updateProjectService
      .updateProject(this.hardProjectModification)
      .subscribe(() => {
        this.hardProjectModification = {
          appFiles: {}
        };
        this.socketProjectModification = {
          appFiles: {}
        };
        this.socketProject = copyObject<Project>(this.currentProject);
      });
  }

  private initialiseInputListening(): void {
    this.monacoTreeInput = (<HTMLElement>(
      this.elementRef.nativeElement
    )).querySelector('.inputarea');
    this.keyup$ = fromEvent(this.monacoTreeInput, 'keyup');
    this.destroyKey.next();
    this.keyup$
      .pipe(
        takeUntil(this.destroyKey),
        map((i: any) => i.currentTarget.value),
        debounceTime(1000)
      )
      .subscribe(() => {
        const editsProjectDTO = this.generateEditProjectDTO();
        this.codeSocketService.sendProjectModification(
          'editProject',
          editsProjectDTO
        );
        this.socketProject = copyObject<Project>(this.currentProject);
      });
  }

  private generateEditProjectDTO(): EditProjectDTO[] {
    const editProjectsDTO: EditProjectDTO[] = [];
    Object.entries(this.socketProjectModification.appFiles).forEach((value) => {
      if (value[1].folderStatus === FolderStatus.MODIFIED) {
        const contentProjectModification = value[1].contents.split('\n');
        const contentProjectInitial =
          this.socketProject.appFiles[value[0]].contents.split('\n');
        const biggerLength =
          contentProjectModification.length > contentProjectInitial.length
            ? contentProjectModification.length
            : contentProjectInitial.length;
        const editProjectDTO: EditProjectDTO = {
          name: value[0].split(this.BASE_PROJECT_PATH)[1],
          type: 'file',
          fullPath: value[0],
          folderStatus: FolderStatus.MODIFIED,
          modifications: []
        };
        for (let i = 0; i < biggerLength; i++) {
          if (contentProjectModification[i] !== contentProjectInitial[i]) {
            editProjectDTO.modifications?.push({
              contents: contentProjectModification[i],
              folderLine: i + 1
            });
          }
        }
        editProjectsDTO.push(editProjectDTO);
      }
    });

    return editProjectsDTO;
  }

  handleClickContextMenu(event: ContextMenuAction): void {
    const element = this.tree.find((element) => element.name === 'src');
    const dir = EditProjectUtils.getReferenceDirectoryFromActiveDirectory(
      event.name.split('/'),
      { name: '', content: [element] }
    );
    const pathSplit = event.name.split('/');
    const lastName = pathSplit[pathSplit.length - 1];
    dir.content?.forEach((element) => {
      if (element.name === lastName) {
        if (event.action === 'new_directory' || event.action === 'new_file') {
          element.edited = true;
          this.makeInputFocusedAfterOneFocused('inputCreate');
        } else if (event.action === 'rename_file') {
          element.rename = true;
          this.makeInputFocusedAfterOneFocused('inputRename');
        }
      }
    });
  }

  private makeInputFocusedAfterOneFocused(elementId: string): void {
    setTimeout(() => {
      const inputAppear = document.getElementById(elementId);
      inputAppear?.focus();
    }, 500);
  }

  handleCreateFile(event: { path: string; nameFile: string }) {
    const nameComplete = event.path + '/' + event.nameFile;
    const editsProjectDTO: EditProjectDTO[] = [
      {
        name: nameComplete.split(this.BASE_PROJECT_PATH)[1],
        type: 'file',
        fullPath: nameComplete,
        folderStatus: FolderStatus.CREATED,
        modifications: []
      }
    ];
    this.currentProject.appFiles[nameComplete] = {
      name: nameComplete.split(this.BASE_PROJECT_PATH)[1],
      type: 'file',
      fullPath: nameComplete,
      contents: '',
      lastModified: Date.now()
    };
    TreeUtils.addFolderInTree(
      this.tree,
      this.BASE_PROJECT_PATH,
      event.path,
      event.nameFile
    );
    console.log(editsProjectDTO);
    this.codeSocketService.sendProjectModification(
      'editProject',
      editsProjectDTO
    );
    this.socketProject = copyObject<Project>(this.currentProject);
  }

  handleCreateDir(event: { path: string; nameDir: string }) {
    const nameComplete = event.path + '/' + event.nameDir;
    const editsProjectDTO: EditProjectDTO[] = [
      {
        name: nameComplete.split(this.BASE_PROJECT_PATH)[1],
        type: 'folder',
        fullPath: nameComplete,
        folderStatus: FolderStatus.CREATED,
        modifications: []
      }
    ];
    this.currentProject.appFiles[event.path] = {
      name: nameComplete.split(this.BASE_PROJECT_PATH)[1],
      type: 'folder',
      fullPath: nameComplete,
      contents: '',
      lastModified: Date.now()
    };
    TreeUtils.addFolderInTree(
      this.tree,
      this.BASE_PROJECT_PATH,
      event.path,
      event.nameDir
    );
    console.log(editsProjectDTO);
    this.codeSocketService.sendProjectModification(
      'editProject',
      editsProjectDTO
    );
    this.socketProject = copyObject<Project>(this.currentProject);
  }

  handleRenameFolder(event: { path: string; newName: string }) {
    console.log('rename folder du dessus');
  }
}
