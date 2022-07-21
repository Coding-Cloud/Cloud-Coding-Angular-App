import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Action, createReducer, on } from '@ngrx/store';
import {
  Comment,
  CommentsState
} from '../../../../shared/models/comment.model';
import { isBefore } from 'date-fns';
import {
  actionCommentsAddOneSuccess,
  actionCommentsDeleteOne,
  actionCommentsGetFromProject,
  actionCommentsGetFromProjectError,
  actionCommentsGetFromProjectSuccess,
  actionCommentsGetFromUser,
  actionCommentsGetFromUserError,
  actionCommentsGetFromUserSuccess,
  actionCommentsInit,
  actionCommentsUpdateOneSuccess
} from './comments.actions';

export function sortByCreatedAt(a: Comment, b: Comment): number {
  return isBefore(new Date(a.createdAt), new Date(b.createdAt)) ? -1 : 1;
}

export const commentsAdapter: EntityAdapter<Comment> =
  createEntityAdapter<Comment>({
    sortComparer: sortByCreatedAt
  });

export const initialState: CommentsState = {
  comments: commentsAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  totalResults: 0,
  loading: false
};

const reducer = createReducer(
  initialState,
  on(actionCommentsAddOneSuccess, (state, { comment }) => ({
    ...state,
    comments: commentsAdapter.addOne(comment, state.comments)
  })),
  on(actionCommentsDeleteOne, (state, { id }) => ({
    ...state,
    comments: commentsAdapter.removeOne(id, state.comments)
  })),
  on(actionCommentsUpdateOneSuccess, (state, { comment }) => {
    const previousComment = state.comments.entities[comment.id];
    if (!previousComment) {
      throw new Error(`Comment with id ${comment.id} not found`);
    }
    const updatedComment: Comment = {
      ...previousComment,
      ...comment
    };
    return {
      ...state,
      comments: commentsAdapter.upsertOne(updatedComment, state.comments)
    };
  }),
  on(actionCommentsInit, () => ({
    ...initialState
  })),
  on(actionCommentsGetFromProject, (state) => ({
    ...state,
    loading: true
  })),
  on(actionCommentsGetFromProjectError, (state) => ({
    ...state,
    loading: false
  })),
  on(actionCommentsGetFromUser, (state) => ({
    ...state,
    loading: true
  })),
  on(actionCommentsGetFromUserError, (state) => ({
    ...state,
    loading: false
  })),
  on(
    actionCommentsGetFromProjectSuccess,
    (state, { comments, totalResults }) => ({
      ...state,
      loading: false,
      comments: commentsAdapter.setAll(comments, state.comments),
      totalResults
    })
  ),
  on(actionCommentsGetFromUserSuccess, (state, { comments, totalResults }) => ({
    ...state,
    loading: false,
    comments: commentsAdapter.setAll(comments, state.comments),
    totalResults
  }))
);

export function commentsReducer(
  state: CommentsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
