import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  BehaviorSubject,
  fromEvent,
  interval,
  Observable,
  Subject
} from 'rxjs';
import { debounceTime, finalize, map, takeUntil } from 'rxjs/operators';
import { ContextMenuAction } from 'src/app/features/monaco-tree/monaco-tree-file/monaco-tree-file.type';
import { MonacoTreeElement } from 'src/app/features/monaco-tree/ngx-monaco-tree.type';
import { CodeSocketService } from '../../services/code-socket.service';
import { EditProjectDTO } from '../../services/dto/edit-project-dto';
import { RenameProjectFolderResource } from '../../services/resource/rename-project-folder-resource';
import { GetProjectFilesService } from '../../services/project-api/get-project-files.service';
import { DeleteProjectFolderResource } from '../../services/resource/delete-project-folder-resource';
import { UpdateProjectService } from '../../services/update-project.service';
import { ExtensionToLanguage } from '../../types/extension-to-language';
import { Folder, FolderStatus } from '../../types/folder.interface';
import { Project } from '../../types/project.interface';
import { Project as ProjectShare } from 'src/app/shared/models/project.model';

import { copyObject } from './utils/copy-object.utils';
import { EditProjectUtils } from './utils/edit-project.utils';
import { TreeUtils } from './utils/tree.utils';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { makeInputFocusedAfterOneFocused } from './utils/html-input.utils';
import { isFile } from './utils/folder.utils';
import { FileTypes } from '../../types/file-types.type';
import { IMAGE_EXTENSION } from 'src/app/core/Image/image-extension';
import { AppState } from 'src/app/core/core.state';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'src/app/core/auth/auth.selectors';
import { ResizeEvent } from 'angular-resizable-element';
import {
  resizeComponentsWhenMoveTerminal,
  validateResizing
} from './utils/resizing-utils';
import { CameraCallInitService } from '../../services/camera-call/camera-call-init.service';
import { CameraEventService } from '../../services/camera-event.service';
import { navigation } from '../../../../app-routing.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  @ViewChild('collapsible') public treeCollapsible:
    | ElementRef<HTMLInputElement>
    | undefined;

  @ViewChild('collapsed') public treeCollapsed:
    | ElementRef<HTMLDivElement>
    | undefined;

  @ViewChild('editorContent') public editorContentElement:
    | ElementRef<HTMLDivElement>
    | undefined;

  @ViewChild('cameraCallComponent') public cameraCallComponent:
    | ElementRef<HTMLDivElement>
    | undefined;

  routerLinks = navigation;
  logo = 'assets/logo.png';

  iconChevronName = 'expand_more';
  iconRestart = 'refresh';
  iconDependenciesResolve = 'get_app';
  cameraChevronName = 'chevron_left';
  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    automaticLayout: true
  };
  code$ = new BehaviorSubject('');
  loadingMonacoEditor$ = new BehaviorSubject(false);
  loadingIframe$ = new BehaviorSubject(true);
  code = '';
  readonly BASE_PROJECT_PATH = environment.baseProjectPath;
  // have to be get from back
  baseUrlPath: string = environment.exposedAppBasePath;
  baseUrlPathTrust: SafeResourceUrl;
  urlPathTrustImage: SafeResourceUrl = '';
  currentFile: {
    path: string;
    type: FileTypes;
  } = { path: '', type: 'other' };
  codeRunnerSysOut$ = new BehaviorSubject('');
  isLoading = false;

  tree: MonacoTreeElement[] = [];

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

  public style1: object = { bottom: '30%' };
  public style2: object = { bottom: '30%' };
  public style3: object = { bottom: '30%' };
  public style4: object = { top: '70%' };

  public style4BottomPreviousValue = '30%';
  public style4BTopPreviousValue = '70%';

  isResizing = false;

  monacoTreeInput: any;

  keyup$: Observable<any> | undefined;

  destroyKey = new Subject<void>();

  destroyFileRead = new Subject<void>();

  uniqueName: string;

  username = '';

  project: ProjectShare | undefined;

  readonly IMAGE_EXTENSION = IMAGE_EXTENSION;

  private source = interval(3000);

  constructor(
    private updateProjectService: UpdateProjectService,
    private elementRef: ElementRef,
    private getProjectService: GetProjectFilesService,
    private cd: ChangeDetectorRef,
    private codeSocketService: CodeSocketService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cameraCallInitService: CameraCallInitService,
    private cameraEventService: CameraEventService
  ) {
    this.uniqueName = this.activatedRoute.snapshot.params.id;

    if (!environment.exposedAppBasePath.includes('localhost')) {
      this.baseUrlPath = `https://${this.uniqueName}.${this.baseUrlPath}`;
    }
    this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrlPath
    );
    this.BASE_PROJECT_PATH += `${this.uniqueName}/`;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProjectService
      .getProjectV2(this.uniqueName)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe((projectCodeEditor: Project) => {
        this.currentProject = copyObject<Project>(projectCodeEditor);
        this.socketProject = copyObject<Project>(projectCodeEditor);

        this.initializeTreeFiles();
      });

    // CODE SOCKETS PART
    this.store.pipe(select(selectUser)).subscribe((user) => {
      this.username = user.username;
      this.codeSocketService.connect(this.uniqueName, user.username);
    });
    this.codeSocketService
      .listenProjectModification('projectModificationFromContributor')
      .subscribe((editsProjectDTO: EditProjectDTO[]) => {
        this.currentProject = EditProjectUtils.editProject(
          { ...this.currentProject },
          editsProjectDTO
        );
        this.socketProject = copyObject<Project>(this.currentProject);

        if (
          this.currentProject.appFiles[`${this.currentFile.path}`]?.contents
        ) {
          this.code$.next(
            this.currentProject.appFiles[`${this.currentFile.path}`].contents
          );
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

        this.hardProjectModification = copyObject<Project>(this.currentProject);
        this.socketProjectModification = copyObject<Project>(
          this.currentProject
        );
        this.socketProject = copyObject<Project>(this.currentProject);
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
        this.tree = TreeUtils.deleteFolder(
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
      this.codeRunnerSysOut$.next(this.codeRunnerSysOut$.getValue() + message);
      this.cd.markForCheck();
    });

    this.codeSocketService
      .listenSiteCanBeShow()
      .subscribe((message: string) => {
        this.loadingIframe$.next(false);
      });

    // CAMERA CALL PART

    this.cameraCallInitService
      .listenAskIfHasToJoin()
      .subscribe((projectUniqueName: string) => {
        if (
          projectUniqueName !== '' &&
          this.cameraChevronName === 'chevron_left'
        ) {
          this.handleClickCameraArrow();
        }
      });

    this.cameraEventService.listenNewCallTriggered().subscribe(() => {
      console.log("je suis dans le client et j'écoute les new call ");
      console.log('this.cameraChevronName ', this.cameraChevronName);
      if (this.cameraChevronName === 'chevron_left') {
        this.handleClickCameraArrow();
      }
    });
  }

  initializeTreeFiles(): void {
    this.tree = TreeUtils.intiateTreeFromProject(
      this.BASE_PROJECT_PATH,
      this.currentProject
    );
    this.cd.markForCheck();
  }

  restartRunner(): void {
    this.codeSocketService.restartRunner(this.uniqueName);
  }

  resolveDependencies(): void {
    this.codeSocketService.resolveDependencies(this.uniqueName);
  }

  handleClickOnFolder(path: string): void {
    if (
      this.currentProject.appFiles[`${this.BASE_PROJECT_PATH}${path}`] !==
        undefined &&
      this.currentProject.appFiles[`${this.BASE_PROJECT_PATH}${path}`].type !==
        'folder'
    ) {
      this.loadingMonacoEditor$.next(true);
      this.getProjectService
        .getFileProjectContent(this.uniqueName, `/${path}`)
        .pipe(finalize(() => this.loadingMonacoEditor$.next(false)))
        .subscribe((content) => {
          this.code$.next(content.content);

          this.currentProject.appFiles[
            `${this.BASE_PROJECT_PATH}${path}`
          ].contents = content.content;
          this.socketProject.appFiles[
            `${this.BASE_PROJECT_PATH}${path}`
          ].contents = content.content;
        });
    } else {
      this.code$.next('');
    }

    this.currentFile.path = `${this.BASE_PROJECT_PATH}${path}`;

    if (isFile(this.currentFile.path)) {
      const endFile = this.currentFile.path.split('/').pop()?.split('.').pop();
      const valueInMap = ExtensionToLanguage.get(endFile as string);
      if (valueInMap !== undefined) {
        this.editorOptions = {
          theme: 'vs-dark',
          language: valueInMap,
          automaticLayout: true
        };
      } else {
        this.editorOptions = {
          theme: 'vs-dark',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          language: ExtensionToLanguage.get('default')!,
          automaticLayout: true
        };
      }

      this.currentFile.type = endFile as FileTypes;
    }
    // editOrOptionsIsModified, we have to wait the rerender of the component
    setTimeout(() => {
      this.initialiseInputListening();
    }, 500);
  }

  handleChange($event: any): void {
    if (!isFile(this.currentFile.path)) {
      return;
    }
    // when click on file that is not changed, just clicked
    if (
      this.currentProject.appFiles[this.currentFile.path].contents === $event
    ) {
      return;
    }

    const newValue: Folder = {
      name: this.currentFile.path.split(this.BASE_PROJECT_PATH)[1],
      type: 'file',
      fullPath: this.currentFile.path,
      contents: $event,
      lastModified: Date.now(),
      folderStatus: FolderStatus.MODIFIED
    };
    this.hardProjectModification.appFiles[this.currentFile.path] = newValue;
    this.socketProjectModification.appFiles[this.currentFile.path] = newValue;
    this.currentProject.appFiles[this.currentFile.path] = newValue;
  }

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

  handleClickContextMenu(event: ContextMenuAction): void {
    if (event.action === 'delete_file') {
      this.deleteFolder({ path: event.name });
    }

    const dir = TreeUtils.getReferenceDirectoryFromActiveDirectory(
      event.name.split('/'),
      { name: '', content: this.tree ?? [] }
    );
    const pathSplit = event.name.split('/');
    const lastName = pathSplit[pathSplit.length - 1];
    dir.content?.forEach((folder) => {
      if (folder.name === lastName) {
        if (event.action === 'new_directory' || event.action === 'new_file') {
          folder.edited = true;
          makeInputFocusedAfterOneFocused('inputCreate');
        } else if (event.action === 'rename_file') {
          if (folder.rename === undefined) {
            folder.rename = new BehaviorSubject(true);
          } else {
            folder.rename.next(true);
          }

          makeInputFocusedAfterOneFocused('inputRename');
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleCreateFile(event: { path: string; nameFile: string }) {
    console.log('on arrive dans le create file');
    console.log('event', event);

    const nameComplete = event.path.endsWith('/')
      ? event.path + event.nameFile
      : event.path + '/' + event.nameFile;
    const editsProjectDTO: EditProjectDTO[] = [
      {
        name: nameComplete.split(this.BASE_PROJECT_PATH)[1] ?? event.nameFile,
        type: 'file',
        fullPath: nameComplete,
        folderStatus: FolderStatus.CREATED,
        modifications: []
      }
    ];
    console.log('editsProjectDTO', editsProjectDTO);
    const newValue: Folder = {
      name: nameComplete.split(this.BASE_PROJECT_PATH)[1],
      type: 'file',
      fullPath: nameComplete,
      contents: '',
      lastModified: Date.now()
    };

    console.log('event', event);
    this.currentProject.appFiles[nameComplete] = newValue;
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
  handleCreateImage(file: { path: string; name: string }) {
    const nameComplete = file.path + '/' + file.name;

    const nameFile = nameComplete.split('/').pop();
    if (nameFile === undefined)
      throw new Error('Uplaod file error in code editor');

    this.currentProject.appFiles[nameComplete] = {
      name: nameFile,
      type: 'file',
      fullPath: nameComplete,
      contents: '',
      lastModified: Date.now()
    };

    TreeUtils.addFolderInTree(
      this.tree,
      this.BASE_PROJECT_PATH,
      file.path,
      file.name
    );
    this.socketProject = copyObject<Project>(this.currentProject);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  handleCreateDir(event: { path: string; nameDir: string }) {
    console.log('on arrive dans le create dir');
    console.log('event', event);
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
    // change file show and content display after rename success
    this.changeCurrentFile(newPath);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  deleteFolder(event: { path: string }) {
    this.tree = TreeUtils.deleteFolder(
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

  handleClickOnCollapse(): void {
    this.treeCollapsible?.nativeElement.classList.toggle('active');
    if (this.treeCollapsed?.nativeElement.style.display === 'none') {
      this.treeCollapsed.nativeElement.style.display = 'block';
      this.iconChevronName = 'expand_more';
    } else if (this.treeCollapsed) {
      this.treeCollapsed.nativeElement.style.display = 'none';
      this.iconChevronName = 'chevron_left';
    }
  }

  validate(event: ResizeEvent): boolean {
    return validateResizing(event);
  }

  onResizeEnd2(event: ResizeEvent): void {
    this.style2 = {
      ...this.style2,
      left: `${event.rectangle.left}px`,
      width: `${event.rectangle.width}px`
    };
    this.isResizing = false;
  }

  onResizeEnd4(event: ResizeEvent): void {
    this.resizingUpperComponents(event);

    this.style4 = {
      ...this.style4,
      top: `calc(${this.style4BTopPreviousValue} + ${event.edges.top}px)`,
      bottom: 0,
      height: 'auto'
    };

    this.style4BottomPreviousValue = `${this.style4BottomPreviousValue} - ${event.edges.top}px`;
    this.style4BTopPreviousValue = `${this.style4BTopPreviousValue} + ${event.edges.top}px`;

    this.isResizing = false;
  }

  onResizing(event: ResizeEvent): void {
    this.isResizing = true;
    this.style1 = {
      ...this.style1,
      width: `${event.rectangle.left}px`
    };

    this.style2 = {
      ...this.style2,
      width: `${event.rectangle.width}px`
    };

    this.style3 = {
      ...this.style3,
      left: `${event.rectangle.left + event.rectangle.width!}px`,
      width: `calc(100% - ${event.rectangle.left + event.rectangle.width!}px)`
    };
  }

  /* resizing*/

  onResizingTerminal(event: ResizeEvent): void {
    this.isResizing = true;

    this.style4 = {
      ...this.style4,
      top: `calc(${this.style4BTopPreviousValue} + ${event.edges.top}px)`,
      bottom: 0,
      height: 'auto'
    };

    this.resizingUpperComponents(event);
  }

  handleCodeVersionChanged() {
    this.isLoading = true;
    this.getProjectService
      .getProjectV2(this.uniqueName)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe((projectCodeEditor: Project) => {
        this.currentProject = copyObject<Project>(projectCodeEditor);
        this.socketProject = copyObject<Project>(projectCodeEditor);

        this.initializeTreeFiles();
      });
  }

  public handleClickCameraArrow() {
    if (this.cameraCallComponent?.nativeElement.style.display === 'block') {
      this.renderer.setStyle(
        this.cameraCallComponent?.nativeElement,
        'display',
        'none'
      );
      this.renderer.setStyle(
        this.editorContentElement?.nativeElement,
        'width',
        '98%'
      );
      this.cameraChevronName = 'chevron_left';
    } else {
      this.renderer.setStyle(
        this.cameraCallComponent?.nativeElement,
        'display',
        'block'
      );
      this.renderer.setStyle(
        this.editorContentElement?.nativeElement,
        'width',
        '80%'
      );

      this.cameraChevronName = 'chevron_right';
    }
  }

  ngOnDestroy(): void {
    console.log('disconnect event');
    this.codeSocketService.disconnect({
      room: this.uniqueName,
      user: this.username
    });
  }

  private initialiseInputListening(): void {
    this.monacoTreeInput = (<HTMLElement>(
      this.elementRef.nativeElement
    )).querySelector('.inputarea');
    if (this.monacoTreeInput === null) {
      return;
    }

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
      if (
        value[1].folderStatus === FolderStatus.MODIFIED &&
        value[1].type === 'file' &&
        this.currentProject.appFiles[value[0]] !== undefined
      ) {
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

  private resizingUpperComponents(event: ResizeEvent): void {
    this.style1 = resizeComponentsWhenMoveTerminal(
      this.style1,
      this.style4BottomPreviousValue,
      event.edges.top
    );
    this.style2 = resizeComponentsWhenMoveTerminal(
      this.style2,
      this.style4BottomPreviousValue,
      event.edges.top
    );
    this.style3 = resizeComponentsWhenMoveTerminal(
      this.style3,
      this.style4BottomPreviousValue,
      event.edges.top
    );
  }

  private changeCurrentFile(path: string): void {
    if (isFile(this.currentFile.path)) {
      this.currentFile.path = `${path}`;

      const endFile = this.currentFile.path.split('/').pop()?.split('.').pop();
      const valueInMap = ExtensionToLanguage.get(endFile as string);
      if (valueInMap !== undefined) {
        this.editorOptions = {
          theme: 'vs-dark',
          language: valueInMap,
          automaticLayout: true
        };
      } else {
        this.editorOptions = {
          theme: 'vs-dark',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          language: ExtensionToLanguage.get('default')!,
          automaticLayout: true
        };
      }

      this.currentFile.type = endFile as FileTypes;
    }
  }
}
