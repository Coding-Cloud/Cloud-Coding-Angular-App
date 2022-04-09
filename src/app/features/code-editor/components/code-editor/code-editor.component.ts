import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { CodeSocketService } from '../../services/code-socket.service';
import { EditProjectDTO } from '../../services/dto/edit-project-dto';
import { GetProjectService } from '../../services/get-project.service';
import { UpdateProjectService } from '../../services/update-project.service';
import { Folder, FolderStatus } from '../../types/folder.interface';
import { Project } from '../../types/project.interface';
import { CodeEditorUtils } from './code-editor.utils';

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
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/';
  //have to be get from back
  baseUrlPath = 'http://localhost:8000';
  baseUrlPathTrust: SafeResourceUrl;
  currentFile = '';

  tree: any[] = [];

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
        '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file'
      )
      .subscribe((project) => {
        this.currentProject = JSON.parse(JSON.stringify(project));
        this.socketProject = JSON.parse(JSON.stringify(project));
        this.initializeTreeFiles();
      });
    this.codeSocketService.connect();
    this.codeSocketService
      .listenProjectModification('projectModificationFromContributor')
      .subscribe((editProjectDTO: EditProjectDTO[]) => {
        this.currentProject = CodeEditorUtils.editProject(
          { ...this.currentProject },
          editProjectDTO
        );

        if (this.currentProject.appFiles[`${this.currentFile}`]) {
          this.code =
            this.currentProject.appFiles[`${this.currentFile}`].contents;
        }
        this.cd.markForCheck();
      });
  }

  initializeTreeFiles(): void {
    const folders = Object.entries(this.currentProject.appFiles)
      .filter((folder) => folder[1].type === 'folder')
      .sort();
    const files = Object.entries(this.currentProject.appFiles)
      .filter((folder) => folder[1].type === 'file')
      .sort();
    const content: { name: string; content?: any[] } = {
      name: 'src',
      content: []
    };
    let tree = [content];
    for (const folder of folders) {
      folder[0] = folder[0].replace(this.BASE_PROJECT_PATH, '');
      const folderSplit = folder[0].split('/');
      // eslint-disable-next-line no-shadow
      const content: { name: string; content?: any[] } = {
        name: folderSplit[folderSplit.length - 1],
        content: []
      };
      const directory = folderSplit[0];
      const directoryFind = tree.find((element) => element.name === directory);
      if (folderSplit.length === 1) tree.push(content);
      else {
        const dirToAdd =
          CodeEditorUtils.getReferenceDirectoryFromActiveDirectory(
            folderSplit.slice(1),
            directoryFind
          );
        dirToAdd?.content?.push(content);
      }
    }

    for (const file of files) {
      file[0] = file[0].replace(this.BASE_PROJECT_PATH, '');
      const fileSplit = file[0].split('/');
      const directory = fileSplit[0];
      const directoryFind = tree.find((element) => element.name === directory);
      const dirToAdd = CodeEditorUtils.getReferenceDirectoryFromActiveDirectory(
        fileSplit.slice(1),
        directoryFind
      );
      dirToAdd?.content?.push({ name: fileSplit[fileSplit.length - 1] });
    }

    this.tree = tree;

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
        this.socketProject = JSON.parse(JSON.stringify(this.currentProject));
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
        this.socketProject = JSON.parse(JSON.stringify(this.currentProject));
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
            this.socketProject.appFiles[value[0]].contents =
              contentProjectModification[i];
          }
        }
        editProjectsDTO.push(editProjectDTO);
      }
    });

    return editProjectsDTO;
  }
}
