import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
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
import { Observable, of } from 'rxjs';
import {
  actionConversationsInitSocket,
  actionConversationsInitSocketError,
  actionConversationsInitSocketSuccess,
  actionConversationsMessagesReceived,
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
  actionConversationsSocketError,
  actionConversationsSocketNewMessage,
  actionConversationsSocketVoid,
  actionConversationsUpdateMessage,
  actionConversationsUpdateMessageError,
  actionConversationsUpdateMessageSuccess
} from './conversation.actions';
import { selectJWTToken, selectUser } from '../../../core/auth/auth.selectors';
import { selectConversation } from './conversation.selectors';
import {
  EventMessageCreated,
  EventMessageType,
  EventMessageUpdated
} from '../../../shared/models/message.model';

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

  /* sendMessage = createEffect(() =>
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
  ); */

  sendMessage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionConversationsSendMessage),
        tap((action) =>
          this.conversationService.sendMessageSocket(action.message)
        )
      ),
    { dispatch: false }
  );
  updateMessage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionConversationsUpdateMessage),
        tap((action) =>
          this.conversationService.updateMessageSocket(action.message)
        )
      ),
    { dispatch: false }
  );
  deleteMessage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionConversationsRemoveMessage),
        tap((action) =>
          this.conversationService.deleteMessageSocket(action.messageId)
        )
      ),
    { dispatch: false }
  );

  /*
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
*/

  initSocket = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsInitSocket),
      withLatestFrom(this.store.pipe(select(selectJWTToken))),
      exhaustMap(([_action, authToken]) =>
        this.conversationService
          .setupConversationSocketConnection(authToken)
          .pipe(
            map(
              () => actionConversationsInitSocketSuccess(),
              catchError((error) =>
                of(
                  actionConversationsInitSocketError({
                    message: error.message.toString()
                  })
                )
              )
            )
          )
      )
    )
  );

  socketConnected = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsInitSocketSuccess),
      withLatestFrom(
        this.store.pipe(select(selectUser)),
        this.store.pipe(select(selectConversation))
      ),
      exhaustMap(([_action]) =>
        this.conversationService.watchSocket().pipe(
          map((data) => {
            switch (data.eventType) {
              case EventMessageType.MESSAGE_CREATED:
                const createdMessage = data.data as EventMessageCreated;
                return actionConversationsSocketNewMessage({
                  message: {
                    ...createdMessage
                  }
                });

              case EventMessageType.MESSAGE_UPDATED:
                const updatedMessage = data.data as EventMessageUpdated;
                return actionConversationsUpdateMessageSuccess({
                  message: {
                    messageId: updatedMessage.messageId,
                    content: updatedMessage.content
                  }
                });
              case EventMessageType.MESSAGE_DELETED:
                const deletedMessageId = data.data as string;
                return actionConversationsRemoveMessageSuccess({
                  messageId: deletedMessageId
                });
              default:
                const errorMessage = data.data as string;
                return actionConversationsSocketError({
                  message: errorMessage
                });
            }
          })
        )
      )
    )
  );

  socketMessageReceivedConnected = createEffect(() =>
    this.actions$.pipe(
      ofType(actionConversationsSocketNewMessage),
      withLatestFrom(this.store.pipe(select(selectConversation))),
      exhaustMap(([action, conversation]) => {
        return new Observable<Action>((observer) => {
          if (action.message.conversationId === conversation.id) {
            observer.next(
              actionConversationsMessagesReceived({
                message: action.message
              })
            );
          } else {
            observer.next(actionConversationsSocketVoid());
          }
          observer.complete();
        });
      })
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
          actionConversationsRemoveMessageError,
          actionConversationsInitSocketError,
          actionConversationsSocketError
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
