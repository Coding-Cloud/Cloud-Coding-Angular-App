import { ResizeEvent } from 'angular-resizable-element';

export function validateResizing(event: ResizeEvent): boolean {
  const MIN_DIMENSIONS_PX = 50;
  return !(
    event.rectangle.width &&
    event.rectangle.height &&
    (event.rectangle.width < MIN_DIMENSIONS_PX ||
      event.rectangle.height < MIN_DIMENSIONS_PX)
  );
}
