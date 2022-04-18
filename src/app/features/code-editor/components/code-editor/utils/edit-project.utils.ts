import { EditProject } from '../../../types/edit-project';
import { FolderStatus } from '../../../types/folder.interface';
import { Project } from '../../../types/project.interface';

export class EditProjectUtils {
  static editProject(
    baseProject: Project,
    editsProject: EditProject[]
  ): Project {
    console.log(editsProject);
    console.log('le edits');
    const project: Project = { ...baseProject };
    editsProject.forEach(async (editProject) => {
      if (
        editProject.folderStatus === FolderStatus.CREATED ||
        editProject.folderStatus === FolderStatus.MODIFIED
      ) {
        console.log('editPoject');
        console.log(editProject);

        if (editProject.folderStatus === FolderStatus.CREATED) {
          if (editProject.type === 'folder') {
            project.appFiles[editProject.fullPath] = {
              ...editProject,
              contents: '',
              lastModified: Date.now()
            };
          } else if (editProject.type === 'file') {
            project.appFiles[editProject.fullPath] = {
              ...editProject,
              contents: '',
              lastModified: Date.now()
            };
          }
        } else {
          const contentLines =
            project.appFiles[editProject.fullPath].contents.split('\n');
          editProject.modifications?.forEach((modification) => {
            contentLines[modification.folderLine - 1] = modification.contents;
          });
          const newContent = contentLines.join('\n');
          project.appFiles[editProject.fullPath].contents = newContent;
        }
      } else if (editProject.folderStatus === FolderStatus.DELETED) {
        delete project.appFiles[editProject.fullPath];
      }
    });

    return project;
  }

  static getReferenceDirectoryFromActiveDirectory(
    path: string[],
    activeDirectory: { name: string; content?: any[] } | undefined
  ): { name: string; content?: any[] } {
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
    activeDirectory: { name: string; content?: any[] } | undefined
  ): { name: string; content?: any[]; edited?: boolean } {
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
}
