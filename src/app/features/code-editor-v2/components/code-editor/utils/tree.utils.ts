import { MonacoTreeElement } from 'src/app/features/monaco-tree/ngx-monaco-tree.type';
import { EditProjectDTO } from '../../../services/dto/edit-project-dto';
import { FolderStatus } from '../../../types/folder.interface';
import { Project } from '../../../types/project.interface';

export class TreeUtils {
  static intiateTreeFromProject(
    baseProjectPath: string,
    project: Project
  ): MonacoTreeElement[] {
    const folders = Object.entries(project.appFiles)
      .filter((folder) => folder[1].type === 'folder')
      .sort();
    const files = Object.entries(project.appFiles)
      .filter((folder) => folder[1].type === 'file')
      .sort();

    const tree: MonacoTreeElement[] = [];
    for (const folder of folders) {
      const fileReplace = folder[0].replace(baseProjectPath, '');
      const folderSplit = fileReplace.split('/');
      // eslint-disable-next-line no-shadow
      const content: { fullPath: string; name: string; content?: any[] } = {
        fullPath: folder[0],
        name: folderSplit[folderSplit.length - 1],
        content: []
      };
      const directory = folderSplit[0];
      const directoryFind = tree.find((element) => element.name === directory);
      if (folderSplit.length === 1) tree.push(content);
      else {
        const dirToAdd = this.getReferenceDirectoryFromActiveDirectory(
          folderSplit.slice(1),
          directoryFind
        );
        dirToAdd?.content?.push(content);
      }
    }

    for (const file of files) {
      const fileReplace = file[0].replace(baseProjectPath, '');
      const fileSplit = fileReplace.split('/');
      const directory = fileSplit[0];
      const directoryFind = tree.find((element) => element.name === directory);
      const elementToAdd = {
        fullPath: file[0],
        name: fileSplit[fileSplit.length - 1]
      };
      if (fileSplit.length === 1) {
        tree.push(elementToAdd);
      } else {
        const dirToAdd = this.getReferenceDirectoryFromActiveDirectory(
          fileSplit.slice(1),
          directoryFind
        );
        dirToAdd?.content?.push(elementToAdd);
      }
    }
    return tree;
  }

  static addFolderInTree(
    tree: MonacoTreeElement[],
    baseProjectPath: string,
    path: string,
    nameFolder: string
  ): void {
    const pathSplit = path.split(baseProjectPath)[1].split('/');
    const dirReference = tree.find((element) => element.name === pathSplit[0]);
    const dirToAdd = this.getReferenceDirectory(
      pathSplit.slice(1),
      dirReference
    );
    if (nameFolder.includes('.')) {
      dirToAdd.content?.push({
        fullPath: path + '/' + nameFolder,
        name: nameFolder
      });
    } else {
      dirToAdd.content?.push({
        fullPath: path + '/' + nameFolder,
        name: nameFolder,
        content: []
      });
    }
    dirToAdd.edited = false;
  }

  static editTree(
    tree: MonacoTreeElement[],
    baseProjectPath: string,
    editsProject: EditProjectDTO[]
  ) {
    editsProject.forEach(async (editProject) => {
      if (editProject.folderStatus === FolderStatus.CREATED) {
        const fullPathSplit = editProject.fullPath.split('/');
        const nameFolder = fullPathSplit[fullPathSplit.length - 1];
        const folderSource = editProject.fullPath.split('/' + nameFolder)[0];
        console.log(folderSource);
        TreeUtils.addFolderInTree(
          tree,
          baseProjectPath,
          folderSource,
          nameFolder
        );
      }
    });
  }

  static renameTreeFolder(
    baseProjectPath: string,
    oldPath: string,
    newPath: string,
    tree: MonacoTreeElement[]
  ): void {
    const oldPathSplit = oldPath.split(baseProjectPath)[1].split('/');
    const dirReference = tree.find(
      (element) => element.name === oldPathSplit[0]
    );

    const folderToRename: MonacoTreeElement = this.getReferenceDirectory(
      oldPathSplit.slice(1),
      dirReference
    );

    const lengthContent = folderToRename.content?.length ?? 0;
    folderToRename.fullPath = newPath;
    if (lengthContent > 0) {
      TreeUtils.recursivelyRenameFullPath(oldPath, newPath, folderToRename);
    }
    folderToRename.name = newPath
      .split(baseProjectPath)[1]
      .split('/')
      .pop() as string;
  }

  static getReferenceDirectoryFromActiveDirectory(
    path: string[],
    activeDirectory:
      | { name: string; fullPath?: string; content?: any[] }
      | undefined
  ): { name: string; content?: any[]; fullPath?: string } {
    if (path.length === 1 && activeDirectory !== undefined) {
      return activeDirectory;
    }

    const directoryfind = activeDirectory?.content?.find(
      (element) => element.name === path[0]
    );
    if (directoryfind === undefined) {
      throw new Error('directory not found: ' + path[0]);
    }

    return this.getReferenceDirectoryFromActiveDirectory(
      path.slice(1),
      directoryfind
    );
  }

  static getReferenceDirectory(
    path: string[],
    activeDirectory:
      | { name: string; fullPath: string; content?: any[] }
      | undefined
  ): { name: string; fullPath: string; content?: any[]; edited?: boolean } {
    if (path.length === 0 && activeDirectory !== undefined) {
      return activeDirectory;
    }

    const directoryfind = activeDirectory?.content?.find(
      (element) => element.name === path[0]
    );
    if (directoryfind === undefined) {
      throw new Error('directory not found: ' + path[0]);
    }

    return this.getReferenceDirectory(path.slice(1), directoryfind);
  }

  static recursivelyRenameFullPath(
    oldPath: string,
    newPath: string,
    monacoTreeElement: MonacoTreeElement | undefined
  ) {
    monacoTreeElement?.content?.forEach((oneContent) => {
      if (oneContent.fullPath.startsWith(oldPath)) {
        oneContent.fullPath = oneContent.fullPath.replace(oldPath, newPath);
        const lengthContent = oneContent.content?.length ?? 0;
        if (lengthContent > 0) {
          this.recursivelyRenameFullPath(oldPath, newPath, oneContent);
        }
      }
    });
  }

  static deleteFolder(
    path: string,
    baseProjectPath: string,
    monacoTreeElement: MonacoTreeElement[]
  ): MonacoTreeElement[] {
    const pathSplit = path.split(baseProjectPath)[1].split('/');

    if (pathSplit.length === 1) {
      return monacoTreeElement?.filter((value) => value.name !== pathSplit[0]);
    }

    const dirReference = monacoTreeElement?.find(
      (element) => element.name === pathSplit[0]
    );

    const folder: {
      name: string;
      fullPath?: string;
      content?: any[] | undefined;
      edited?: boolean | undefined;
    } | null = this.getReferenceDirectoryFromActiveDirectory(
      pathSplit.slice(1),
      dirReference
    );

    folder.content = folder.content?.filter((value) => value.fullPath !== path);
    return monacoTreeElement;
  }
}
