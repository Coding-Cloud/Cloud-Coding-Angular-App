import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { sourceProject } from '../../data/source-project';
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

  constructor(private updateProjectService: UpdateProjectService) {}

  ngOnInit(): void {
    this.initializeTreeFiles();
  }

  initializeTreeFiles(): void {
    const folders = Object.entries(sourceProject.appFiles)
      .filter((folder) => folder[1].type === 'folder')
      .sort();
    const files = Object.entries(sourceProject.appFiles)
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
  }

  handleClickOnFolder(event: string): void {
    console.log(`${this.BASE_PROJECT_PATH}${event}`);
    if (
      sourceProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`] !==
        undefined &&
      sourceProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`].contents !==
        ''
    )
      this.code =
        sourceProject.appFiles[`${this.BASE_PROJECT_PATH}${event}`].contents;
    this.currentFile = `${this.BASE_PROJECT_PATH}${event}`;
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
        console.log('project update');
      });
  }
}
