import { EditProject } from '../../../types/edit-project';
import { Folder, FolderStatus } from '../../../types/folder.interface';
import { Project } from '../../../types/project.interface';
import { copyObject } from './copy-object.utils';

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

  static modifyPathInAllProject(
    baseProjectPath: string,
    oldPath: string,
    newPath: string,
    project: Project
  ): Project {
    const initialValue = {};
    const folders = Object.entries(project.appFiles).reduce(
      (obj, folder: [string, Folder]) => {
        let entry: { [x: string]: Folder };
        if (folder[0].startsWith(oldPath)) {
          folder[0].replace(oldPath, newPath);
          entry = {
            [folder[0].replace(oldPath, newPath)]: {
              ...folder[1],
              fullPath: folder[0].replace(oldPath, newPath),
              name: folder[0]
                .replace(oldPath, newPath)
                .split(baseProjectPath)
                .pop()
                ?.split('/')
                .pop() as string
            }
          };
        } else {
          entry = { [folder[0]]: folder[1] };
        }
        return {
          ...obj,
          ...entry
        };
      },
      initialValue
    );

    return { appFiles: folders };
  }
}
