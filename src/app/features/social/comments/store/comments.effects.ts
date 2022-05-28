import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  actionCommentsAddOne,
  actionCommentsAddOneError,
  actionCommentsAddOneSuccess,
  actionCommentsDeleteOne,
  actionCommentsDeleteOneError,
  actionCommentsDeleteOneSuccess,
  actionCommentsGetFromProject,
  actionCommentsGetFromProjectError,
  actionCommentsGetFromProjectSuccess,
  actionCommentsUpdateOne,
  actionCommentsUpdateOneError,
  actionCommentsUpdateOneSuccess
} from './comments.actions';
import { CommentsService } from '../comments.service';
import { selectUser } from '../../../../core/auth/auth.selectors';
import { navigation } from '../../../../app-routing.module';
import { AppState } from '../../../../core/core.state';
import { NotificationService } from '../../../../core/notifications/notification.service';

@Injectable()
export class CommentsEffects {
  retrieveFromProject = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCommentsGetFromProject),
      exhaustMap((action) =>
        this.commentsService.getProjectComments(action.projectId).pipe(
          map(({ comments, totalResults }) =>
            actionCommentsGetFromProjectSuccess({ comments, totalResults })
          ),
          catchError((error) =>
            of(
              actionCommentsGetFromProjectError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  addOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCommentsAddOne),
      withLatestFrom(this.store.pipe(select(selectUser))),
      exhaustMap(([action, user]) =>
        this.commentsService.addComment(action.comment).pipe(
          map((commentId: string) =>
            actionCommentsAddOneSuccess({
              comment: {
                id: commentId,
                ownerId: user.id,
                createdAt: new Date(),
                ...action.comment
              }
            })
          ),
          catchError((error) =>
            of(actionCommentsAddOneError({ message: error.message }))
          )
        )
      )
    )
  );

  deleteOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCommentsDeleteOne),
      exhaustMap((action) =>
        this.commentsService.deleteComment(action.id).pipe(
          map(() => actionCommentsDeleteOneSuccess()),
          catchError((error) =>
            of(actionCommentsDeleteOneError({ message: error.message }))
          )
        )
      )
    )
  );

  deleteOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionCommentsDeleteOneSuccess),
        tap(() => {
          this.notificationService.success('Commentaire supprimé');
        })
      ),
    { dispatch: false }
  );

  updateOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCommentsUpdateOne),
      exhaustMap((action) =>
        this.commentsService.updateComment(action.comment).pipe(
          map(() =>
            actionCommentsUpdateOneSuccess({
              comment: action.comment
            })
          ),
          catchError((error) =>
            of(actionCommentsUpdateOneError({ message: error.message }))
          )
        )
      )
    )
  );

  updateOneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionCommentsUpdateOneSuccess),
        tap(() => {
          this.notificationService.success('Commentaire modifié');
        })
      ),
    { dispatch: false }
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionCommentsAddOneError,
          actionCommentsDeleteOneError,
          actionCommentsGetFromProjectError,
          actionCommentsUpdateOneError
        ),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private commentsService: CommentsService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
