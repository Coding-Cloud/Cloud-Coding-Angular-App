import { IMAGE_EXTENSION } from '../../../types/file-types.type';

export const isFile = (path: string): boolean =>
  path.split('/').pop()?.includes('.') ?? false;

export const isImage = (path: string): boolean =>
  IMAGE_EXTENSION.includes(path.split('/').pop()?.split('.').pop() ?? '');
