import { MonacoTreeElement } from 'src/app/features/monaco-tree/ngx-monaco-tree.type';
import { EditProjectDTO } from '../../../services/dto/edit-project-dto';
import { FolderStatus } from '../../../types/folder.interface';
import { Project } from '../../../types/project.interface';
import { EditProjectUtils } from './edit-project.utils';

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
    const content: MonacoTreeElement = {
      fullPath: baseProjectPath + 'src',
      name: 'src',
      content: []
    };
    let tree: MonacoTreeElement[] = [content];
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
        const dirToAdd =
          EditProjectUtils.getReferenceDirectoryFromActiveDirectory(
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
      const dirToAdd =
        EditProjectUtils.getReferenceDirectoryFromActiveDirectory(
          fileSplit.slice(1),
          directoryFind
        );
      dirToAdd?.content?.push({
        fullPath: file[0],
        name: fileSplit[fileSplit.length - 1]
      });
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
    const dirToAdd = EditProjectUtils.getReferenceDirectory(
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
}
