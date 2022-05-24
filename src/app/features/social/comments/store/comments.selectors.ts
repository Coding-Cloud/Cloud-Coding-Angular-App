import { commentsAdapter } from './comments.reducer';
import { createSelector } from '@ngrx/store';
import { selectCommentsState } from '../../../../core/core.state';
import { CommentsState } from '../../../../shared/models/comment.model';

const commentsSelector = commentsAdapter.getSelectors();

export const selectComments = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.comments
);

export const selectCommentsTotalResults = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.totalResults
);
export const selectCommentsLoading = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.loading
);

export const selectAllComments = createSelector(
  selectComments,
  commentsSelector.selectAll
);
