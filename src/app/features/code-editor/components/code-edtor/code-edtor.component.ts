import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { CodeSocketService } from '../../services/code-socket.service';
import { EditProjectDTO } from '../../services/dto/edit-project-dto';
import { GetProjectService } from '../../services/get-project.service';
import { UpdateProjectService } from '../../services/update-project.service';
import { Folder, FolderStatus } from '../../types/folder.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-code-edtor',
  templateUrl: './code-edtor.component.html',
  styleUrls: ['./code-edtor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEdtorComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'typescript' };
  code = '';
  readonly BASE_PROJECT_PATH =
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/';
  currentFile = '';

  tree: any[] = [];

  title = 'test-npx';
  projectModification: { appFiles: { [key: string]: Folder } } = {
    appFiles: {}
  };

  currentProject: { appFiles: { [key: string]: Folder } } = {
    appFiles: {}
  };

  socketProject: { appFiles: { [key: string]: Folder } } = {
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
    private codeSocketService: CodeSocketService
  ) {}

  ngOnInit(): void {
    this.getProjectService
      .getProject(
        '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file'
      )
      .subscribe((project) => {
        this.currentProject = project;
        this.initializeTreeFiles();
      });
    this.codeSocketService.connect();
  }

  initializeTreeFiles(): void {
    console.log(this.currentProject.appFiles);
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
    console.log(folders);
    for (let folder of folders) {
      folder[0] = folder[0].replace(this.BASE_PROJECT_PATH, '');
      const folderSplit = folder[0].split('/');
      // eslint-disable-next-line no-shadow
      const content: { name: string; content?: any[] } = {
        name: folderSplit[folderSplit.length - 1],
        content: []
      };
      tree.push(content);
    }

    for (let file of files) {
      const fileSplit = file[0].split('/');
      const directory = fileSplit[fileSplit.length - 2];
      tree.forEach((element) => {
        if (element.name === directory) {
          element.content?.push({ name: fileSplit[fileSplit.length - 1] });
        }
      });
    }
    const treeApp = tree.find((element) => element.name === 'app');
    tree = tree.filter((element) => element.name !== 'app');
    tree.forEach((element) => {
      if (element.name === 'src') {
        element.content?.push(treeApp);
      }
    });

    this.tree = tree;
    this.cd.markForCheck();
  }

  handleClickOnFolder(event: string): void {
    console.log(`${this.BASE_PROJECT_PATH}${event}`);
    if (
      this.currentProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`] !==
        undefined &&
      this.currentProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`]
        .contents !== ''
    )
      this.code =
        this.currentProject.appFiles[
          `${this.BASE_PROJECT_PATH}${event}`
        ].contents;
    this.currentFile = `${this.BASE_PROJECT_PATH}${event}`;
    this.initialiseInputListening();
  }

  handleChange($event: any): void {
    this.projectModification.appFiles[this.currentFile] = {
      name: this.currentFile.split(this.BASE_PROJECT_PATH)[1],
      type: 'file',
      fullPath: this.currentFile,
      contents: $event,
      lastModified: Date.now(),
      folderStatus: FolderStatus.MODIFIED
    };
  }

  handleSave(): void {
    this.updateProjectService
      .updateProject(this.projectModification)
      .subscribe(() => {
        this.projectModification = {
          appFiles: {}
        };
        console.log('project update');
      });
  }

  private initialiseInputListening(): void {
    console.log("on passe dans l'initialise");
    this.monacoTreeInput = (<HTMLElement>(
      this.elementRef.nativeElement
    )).querySelector('.inputarea');
    console.log(this.monacoTreeInput);
    this.keyup$ = fromEvent(this.monacoTreeInput, 'keyup');
    this.destroyKey.next();
    this.keyup$
      .pipe(
        takeUntil(this.destroyKey),
        map((i: any) => i.currentTarget.value),
        debounceTime(3000)
      )
      .subscribe(() => {
        const editsProjectDTO = this.generateEditProjectDTO();
        this.socketProject = this.currentProject;
        this.codeSocketService.sendProjectModification(
          'editProject',
          editsProjectDTO
        );
      });
  }

  private generateEditProjectDTO(): EditProjectDTO[] {
    const editProjectsDTO: EditProjectDTO[] = [];
    Object.entries(this.projectModification.appFiles).forEach((value) => {
      if (value[1].folderStatus === FolderStatus.MODIFIED) {
        const contentProjectModification = value[1].contents.split('\n');
        const contentProjectInitial =
          this.currentProject.appFiles[value[0]].contents.split('\n');
        const biggerLength =
          contentProjectModification.length > contentProjectInitial.length
            ? contentProjectModification.length
            : contentProjectInitial.length;
        const editProjectDTO: EditProjectDTO = {
          name: value[0].split(this.BASE_PROJECT_PATH)[1],
          type: 'file',
          fullPath: this.currentFile,
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
}
