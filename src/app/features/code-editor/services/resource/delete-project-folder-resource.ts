export interface DeleteProjectFolderResource {
  path: string;
  type: 'file' | 'dir';
  basePath: string;
}
