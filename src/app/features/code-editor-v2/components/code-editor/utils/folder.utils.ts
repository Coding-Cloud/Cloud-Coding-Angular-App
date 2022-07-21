import { IMAGE_EXTENSION } from 'src/app/core/Image/image-extension';

export const isFile = (path: string): boolean =>
  path.split('/').pop()?.includes('.') ?? false;

export const isImage = (path: string): boolean =>
  IMAGE_EXTENSION.includes(path.split('/').pop()?.split('.').pop() ?? '');
