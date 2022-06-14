import { createAction, props } from '@ngrx/store';
import { Conversation } from '../../../shared/models/conversation.model';
import {
  CreateMessage,
  Message,
  UpdateMessage
} from '../../../shared/models/message.model';

export const actionConversationsRetrieveOne = createAction(
  '[Conversations] Retrieve One',
  props<{ conversationId: string }>()
);

export const actionConversationsRetrieveOneSuccess = createAction(
  '[Conversations] Retrieve One Success',
  props<{ conversation: Conversation }>()
);

export const actionConversationsRetrieveOneError = createAction(
  '[Conversations] Retrieve One Error',
  props<{ message: string }>()
);

export const actionConversationsRetrieveAllMessages = createAction(
  '[Conversations] Retrieve All Messages'
);

export const actionConversationsRetrieveAllMessagesSuccess = createAction(
  '[Conversations] Retrieve All Messages Success',
  props<{ messages: Message[] }>()
);

export const actionConversationsRetrieveAllMessagesError = createAction(
  '[Conversations] Retrieve All Messages Error',
  props<{ message: string }>()
);

export const actionConversationsSendMessage = createAction(
  '[Conversations] Send Message',
  props<{ message: CreateMessage }>()
);

export const actionConversationsSendMessageSuccess = createAction(
  '[Conversations] Send Message Success',
  props<{ message: Message }>()
);

export const actionConversationsSendMessageError = createAction(
  '[Conversations] Send Message Error',
  props<{ message: string }>()
);

export const actionConversationsUpdateMessage = createAction(
  '[Conversations] Update Message',
  props<{ message: UpdateMessage }>()
);

export const actionConversationsUpdateMessageSuccess = createAction(
  '[Conversations] Update Message Success',
  props<{ message: Message }>()
);

export const actionConversationsUpdateMessageError = createAction(
  '[Conversations] Update Message Error',
  props<{ message: string }>()
);

export const actionConversationsRemoveConversation = createAction(
  '[Conversations] Remove Conversation',
  props<{ conversationId: string }>()
);

export const actionConversationsRemoveConversationSuccess = createAction(
  '[Conversations] Remove Conversation Success',
  props<{ conversationId: string }>()
);

export const actionConversationsRemoveConversationError = createAction(
  '[Conversations] Remove Conversation Error',
  props<{ message: string }>()
);
