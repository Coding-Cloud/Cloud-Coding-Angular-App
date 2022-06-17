// conversation reducer with sort by date comparator
import { ConversationState } from '../../../shared/models/conversation.model';
import { getTime } from 'date-fns';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Message } from '../../../shared/models/message.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionConversationsMessagesReceived,
  actionConversationsRemoveMessageSuccess,
  actionConversationsRetrieveAllMessages,
  actionConversationsRetrieveAllMessagesError,
  actionConversationsRetrieveAllMessagesSuccess,
  actionConversationsRetrieveOneByFriendship,
  actionConversationsRetrieveOneByGroup,
  actionConversationsRetrieveOneError,
  actionConversationsRetrieveOneSuccess,
  actionConversationsSendMessageSuccess,
  actionConversationsUpdateMessageSuccess
} from './conversation.actions';

function sortByDate(a: Message, b: Message): number {
  return getTime(new Date(a.createdAt)) - getTime(new Date(b.createdAt));
}

export const messagesAdapter: EntityAdapter<Message> =
  createEntityAdapter<Message>({
    sortComparer: sortByDate
  });

export const initialState: ConversationState = {
  conversation: {
    id: '0',
    createdAt: new Date()
  },
  messages: messagesAdapter.getInitialState({
    ids: [],
    entities: {}
  }),
  conversationsLoading: false,
  messagesLoading: false
};

const reducer = createReducer(
  initialState,
  on(
    actionConversationsRetrieveOneByFriendship,
    actionConversationsRetrieveOneByGroup,
    (state) => ({
      ...state,
      conversation: {
        id: '0',
        createdAt: new Date()
      },
      conversationsLoading: true
    })
  ),
  on(actionConversationsRetrieveOneSuccess, (state, { conversation }) => ({
    ...state,
    conversation,
    conversationsLoading: false
  })),
  on(actionConversationsRetrieveOneError, (state) => ({
    ...state,
    conversationsLoading: false
  })),
  on(actionConversationsRetrieveAllMessages, (state) => ({
    ...state,
    messagesLoading: true,
    messages: messagesAdapter.removeAll(state.messages)
  })),
  on(actionConversationsRetrieveAllMessagesSuccess, (state, { messages }) => ({
    ...state,
    messagesLoading: false,
    messages: messagesAdapter.setAll(messages, state.messages)
  })),
  on(actionConversationsRetrieveAllMessagesError, (state) => ({
    ...state,
    messagesLoading: false
  })),
  on(
    actionConversationsSendMessageSuccess,
    actionConversationsMessagesReceived,
    (state, { message }) => ({
      ...state,
      messages: messagesAdapter.addOne(message, state.messages)
    })
  ),
  on(actionConversationsUpdateMessageSuccess, (state, { message }) => ({
    ...state,
    messages: messagesAdapter.updateOne(
      {
        id: message.id,
        changes: { content: message.content }
      },
      state.messages
    )
  })),
  on(actionConversationsRemoveMessageSuccess, (state, { messageId }) => ({
    ...state,
    messages: messagesAdapter.removeOne(messageId, state.messages)
  }))
);

export function conversationReducer(
  state: ConversationState | undefined,
  action: Action
) {
  return reducer(state, action);
}
