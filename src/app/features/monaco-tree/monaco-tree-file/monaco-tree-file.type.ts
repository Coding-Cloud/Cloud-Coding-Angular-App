export type ContextMenuAction = {
  action: 'new_file' | 'new_directory' | 'delete_file' | 'rename_file';
  name: string;
  type: 'file' | 'dir';
};
