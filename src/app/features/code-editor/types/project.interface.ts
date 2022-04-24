import { Folder } from './folder.interface';

export interface Project {
  appFiles: { [key: string]: Folder };
}
