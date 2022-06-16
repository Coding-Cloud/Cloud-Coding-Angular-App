import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { NotificationService } from '../../../core/notifications/notification.service';
import { Router } from '@angular/router';
import { ConversationService } from '../conversation.service';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  actionConversationsRemoveMessage,
  actionConversationsRemoveMessageError,
  actionConversationsRemoveMessageSuccess,
  actionConversationsRetrieveAllMessages,
  actionConversationsRetrieveAllMessagesError,
  actionConversationsRetrieveAllMessagesSuccess,
  actionConversationsRetrieveOneByFriendship,
  actionConversationsRetrieveOneByGroup,
  actionConversationsRetrieveOneError,
  actionConversationsRetrieveOneSuccess,
  actionConversationsSendMessage,
  actionConversationsSendMessageError,
  actionConversationsSendMessageSuccess,
  actionConversationsUpdateMessage,
  actionConversationsUpdateMessageError,
  actionConversationsUpdateMessageSuccess
} from './conversation.actions';
import { selectUser } from '../../../core/auth/auth.selectors';
import { selectConversation } from './conversation.selectors';

@Injectable()
export class ConversationEffects {
  retrieveConversationByFriendship = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsRetrieveOneByFriendship),
      exhaustMap((action) =>
        this.conversationService
          .getConversationByFriendship(action.friendshipId)
          .pipe(
            map((conversation) =>
              actionConversationsRetrieveOneSuccess({ conversation })
            ),
            catchError((error) =>
              of(
                actionConversationsRetrieveOneError({
                  message: error.message.toString()
                })
              )
            )
          )
      )
    )
  );

  retrieveConversationByGroup = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsRetrieveOneByGroup),
      exhaustMap((action) =>
        this.conversationService.getConversationByGroup(action.groupId).pipe(
          map((conversation) =>
            actionConversationsRetrieveOneSuccess({ conversation })
          ),
          catchError((error) =>
            of(
              actionConversationsRetrieveOneError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  retrieveMessages = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsRetrieveAllMessages),
      exhaustMap((action) =>
        this.conversationService.getMessages(action.conversationId).pipe(
          map(({ messages, totalResults }) =>
            actionConversationsRetrieveAllMessagesSuccess({ messages })
          ),
          catchError((error) =>
            of(
              actionConversationsRetrieveAllMessagesError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  sendMessage = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsSendMessage),
      withLatestFrom(
        this.store.pipe(select(selectUser)),
        this.store.pipe(select(selectConversation))
      ),
      exhaustMap(([action, user, conversation]) =>
        this.conversationService.sendMessage(action.message).pipe(
          map((messageId) =>
            actionConversationsSendMessageSuccess({
              message: {
                id: messageId,
                conversationId: conversation.id,
                userId: user.id,
                content: action.message.content,
                createdAt: new Date(),
                assetId: ''
              }
            })
          ),
          catchError((error) =>
            of(
              actionConversationsSendMessageError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  updateMessage = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsUpdateMessage),
      exhaustMap(({ message }) =>
        this.conversationService.updateMessage(message).pipe(
          map(() =>
            actionConversationsUpdateMessageSuccess({
              message: message
            })
          ),
          catchError((error) =>
            of(
              actionConversationsUpdateMessageError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  deleteMessage = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsRemoveMessage),
      exhaustMap(({ messageId }) =>
        this.conversationService.deleteMessage(messageId).pipe(
          map(() =>
            actionConversationsRemoveMessageSuccess({
              messageId
            })
          ),
          catchError((error) =>
            of(
              actionConversationsRemoveMessageError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionConversationsRetrieveOneError,
          actionConversationsRetrieveAllMessagesError,
          actionConversationsSendMessageError,
          actionConversationsUpdateMessageError,
          actionConversationsRemoveMessageError
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
    private conversationService: ConversationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
