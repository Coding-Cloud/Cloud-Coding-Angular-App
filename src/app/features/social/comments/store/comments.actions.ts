import { createAction, props } from '@ngrx/store';
import {
  Comment,
  CreateComment,
  UpdateComment
} from '../../../../shared/models/comment.model';

export const actionCommentsAddOne = createAction(
  '[Comments] Add One',
  props<{ comment: CreateComment }>()
);
export const actionCommentsAddOneSuccess = createAction(
  '[Comments] Add One Success',
  props<{ comment: Comment }>()
);

export const actionCommentsAddOneError = createAction(
  '[Comments] Add One Error',
  props<{ message: string }>()
);

export const actionCommentsDeleteOne = createAction(
  '[Comments] Delete One',
  props<{ id: string }>()
);
export const actionCommentsDeleteOneSuccess = createAction(
  '[Comments] Delete One Success'
);

export const actionCommentsDeleteOneError = createAction(
  '[Comments] Delete One Error',
  props<{ message: string }>()
);

export const actionCommentsUpdateOne = createAction(
  '[Comments] Update One',
  props<{ comment: UpdateComment }>()
);

export const actionCommentsUpdateOneSuccess = createAction(
  '[Comments] Update One Success',
  props<{ comment: UpdateComment }>()
);

export const actionCommentsUpdateOneError = createAction(
  '[Comments] Update One Error',
  props<{ message: string }>()
);

export const actionCommentsInit = createAction('[Comments] Init');

export const actionCommentsGetFromProject = createAction(
  '[Comments] Get project comments',
  props<{ projectId: string }>()
);

export const actionCommentsGetFromProjectSuccess = createAction(
  '[Comments] Get project comments success',
  props<{ comments: Comment[]; totalResults: number }>()
);

export const actionCommentsGetFromProjectError = createAction(
  '[Comments] Get project comments error',
  props<{ message: string }>()
);

export const actionCommentsGetFromUser = createAction(
  '[Comments] Get user comments',
  props<{ userId: string }>()
);

export const actionCommentsGetFromUserSuccess = createAction(
  '[Comments] Get user comments success',
  props<{ comments: Comment[]; totalResults: number }>()
);

export const actionCommentsGetFromUserError = createAction(
  '[Comments] Get user comments error',
  props<{ message: string }>()
);
