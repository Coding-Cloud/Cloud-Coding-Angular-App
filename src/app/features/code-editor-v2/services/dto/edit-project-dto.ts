import { FolderStatus } from '../../types/folder.interface';

export interface EditProjectDTO {
  name: string;
  type: 'file' | 'folder';
  fullPath: string;
  folderStatus?: FolderStatus;
  modifications?: Modification[];
}

export interface Modification {
  contents: string;
  folderLine: number;
}
