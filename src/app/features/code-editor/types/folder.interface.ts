export interface Folder {
  name: string;
  type: 'file' | 'folder';
  contents: string;
  fullPath: string;
  lastModified: number;
  folderStatus?: FolderStatus;
}

// eslint-disable-next-line no-shadow
export enum FolderStatus {
  CREATED = 'created',
  DELETED = 'deleted',
  MODIFIED = 'modified'
}
