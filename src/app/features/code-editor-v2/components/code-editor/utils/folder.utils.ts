export const isFile = (path: string): boolean =>
  path.split('/').pop()?.includes('.') ?? false;
