export interface Folder {
  name: string;
  type: 'file' | 'folder';
  contents: string;
  fullPath: string;
  lastModified: number;
  folderStatus?: FolderStatus;
}

export enum FolderStatus {
  CREATED = 'created',
  DELETED = 'deleted',
  MODIFIED = 'modified'
}
