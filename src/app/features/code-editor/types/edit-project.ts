import { FolderStatus } from './folder.interface';

export interface EditProject {
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
