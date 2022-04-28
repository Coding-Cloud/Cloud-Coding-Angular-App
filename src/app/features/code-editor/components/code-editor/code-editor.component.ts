import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { ContextMenuAction } from 'src/app/features/monaco-tree/monaco-tree-file/monaco-tree-file.type';
import { MonacoTreeElement } from 'src/app/features/monaco-tree/ngx-monaco-tree.type';
import { CodeSocketService } from '../../services/code-socket.service';
import { EditProjectDTO } from '../../services/dto/edit-project-dto';
import { RenameProjectFolderResource } from '../../services/resource/rename-project-folder-resource';
import { GetProjectService } from '../../services/get-project.service';
import { DeleteProjectFolderResource } from '../../services/resource/delete-project-folder-resource';
import { UpdateProjectService } from '../../services/update-project.service';
import { ExtensionToLanguage } from '../../types/extension-to-language';
import { Folder, FolderStatus } from '../../types/folder.interface';
import { Project } from '../../types/project.interface';
import { copyObject } from './utils/copy-object.utils';
import { EditProjectUtils } from './utils/edit-project.utils';
import { TreeUtils } from './utils/tree.utils';
import { ActivatedRoute } from '@angular/router';

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
    '/Users/remy/Documents/ESGI/annee_4/projet_annuel/project_test/';
  // have to be get from back
  baseUrlPath = 'http://localhost:8000';
  baseUrlPathTrust: SafeResourceUrl;
  currentFile = '';
  codeRunnerSysOut = '';

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

  projectId: string;

  constructor(
    private updateProjectService: UpdateProjectService,
    private elementRef: ElementRef,
    private getProjectService: GetProjectService,
    private cd: ChangeDetectorRef,
    private codeSocketService: CodeSocketService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {
    this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrlPath
    );
    this.projectId = this.activatedRoute.snapshot.params.id;
    this.BASE_PROJECT_PATH += `${this.projectId}/`;
  }

  ngOnInit(): void {
    this.getProjectService
      .getProject(this.BASE_PROJECT_PATH)
      .subscribe((project: Project) => {
        this.currentProject = copyObject<Project>(project);
        this.socketProject = copyObject<Project>(project);

        this.initializeTreeFiles();
      });
    this.codeSocketService.connect(this.projectId);
    this.codeSocketService
      .listenProjectModification('projectModificationFromContributor')
      .subscribe((editsProjectDTO: EditProjectDTO[]) => {
        this.currentProject = EditProjectUtils.editProject(
          { ...this.currentProject },
          editsProjectDTO
        );
        this.socketProject = copyObject<Project>(this.currentProject);

        if (this.currentProject.appFiles[`${this.currentFile}`]) {
          this.code =
            this.currentProject.appFiles[`${this.currentFile}`].contents;
        }
        TreeUtils.editTree(this.tree, this.BASE_PROJECT_PATH, editsProjectDTO);
        this.cd.markForCheck();
      });

    this.codeSocketService
      .listenRenameProjectFolderName()
      .subscribe((renameProjectFolderResource: RenameProjectFolderResource) => {
        this.currentProject = EditProjectUtils.modifyPathInAllProject(
          this.BASE_PROJECT_PATH,
          renameProjectFolderResource.oldName,
          renameProjectFolderResource.newName,
          this.currentProject
        );
        this.socketProject = copyObject<Project>(this.currentProject);
        console.log('current project');
        console.log(this.currentProject);
        TreeUtils.renameTreeFolder(
          this.BASE_PROJECT_PATH,
          renameProjectFolderResource.oldName,
          renameProjectFolderResource.newName,
          this.tree
        );
        this.cd.markForCheck();
      });

    this.codeSocketService
      .listenDeleteProjectFolderName()
      .subscribe((deleteprojectFolderResource: DeleteProjectFolderResource) => {
        TreeUtils.deleteFolder(
          deleteprojectFolderResource.path,
          this.BASE_PROJECT_PATH,
          this.tree
        );
        EditProjectUtils.deleteFolder(
          deleteprojectFolderResource.path,
          this.currentProject
        );
        this.socketProject = copyObject<Project>(this.currentProject);
        this.cd.markForCheck();
      });

    this.codeSocketService.listenLogsChanged().subscribe((message: string) => {
      this.codeRunnerSysOut = message;
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
    const isFile = this.currentFile.split('/').pop()?.includes('.');
    if (isFile) {
      const endFile = this.currentFile.split('/').pop()?.split('.').pop();
      const valueInMap = ExtensionToLanguage.get(endFile as string);
      if (valueInMap !== undefined) {
        this.editorOptions = { theme: 'vs-dark', language: valueInMap };
      } else {
        this.editorOptions = {
          theme: 'vs-dark',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          language: ExtensionToLanguage.get('default')!
        };
      }
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
    this.socketProjectModification.appFiles[this.currentFile] = newValue;

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
        this.socketProjectModification.appFiles = {};
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleClickContextMenu(event: ContextMenuAction): void {
    console.log("je suis l'event");

    if (event.action === 'delete_file') {
      this.deleteFolder({ path: event.name });
    }

    const element = this.tree.find((element) => element.name === 'src');
    const dir = TreeUtils.getReferenceDirectoryFromActiveDirectory(
      event.name.split('/'),
      { name: '', content: [element] }
    );
    const pathSplit = event.name.split('/');
    const lastName = pathSplit[pathSplit.length - 1];
    dir.content?.forEach((element) => {
      if (element.name === lastName) {
        if (event.action === 'new_directory' || event.action === 'new_file') {
          console.log('on met element à edited');
          console.log(element);
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
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
    this.codeSocketService.sendProjectModification(
      'editProject',
      editsProjectDTO
    );
    this.socketProject = copyObject<Project>(this.currentProject);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleRenameFolder(event: { path: string; newName: string }) {
    const pathSplit = event.path.split('/');
    pathSplit.pop();
    const newPath = `${pathSplit.join('/')}/${event.newName}`;
    this.currentProject = EditProjectUtils.modifyPathInAllProject(
      this.BASE_PROJECT_PATH,
      event.path,
      newPath,
      this.currentProject
    );
    this.socketProject = copyObject<Project>(this.currentProject);
    console.log('dans le rename');
    console.log(this.currentProject);
    console.log(this.socketProject);
    console.log(this.socketProjectModification);
    console.log(this.hardProjectModification);

    TreeUtils.renameTreeFolder(
      this.BASE_PROJECT_PATH,
      event.path,
      newPath,
      this.tree
    );
    this.codeSocketService.renameProjectFolder({
      oldName: event.path,
      newName: newPath
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  deleteFolder(event: { path: string }) {
    TreeUtils.deleteFolder(
      this.BASE_PROJECT_PATH + event.path,
      this.BASE_PROJECT_PATH,
      this.tree
    );
    EditProjectUtils.deleteFolder(
      this.BASE_PROJECT_PATH + event.path,
      this.currentProject
    );
    this.socketProject = copyObject<Project>(this.currentProject);
    this.codeSocketService.deleteProjectFolder(
      this.BASE_PROJECT_PATH + event.path
    );
  }
}
