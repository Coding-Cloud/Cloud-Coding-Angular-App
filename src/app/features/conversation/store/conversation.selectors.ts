import { messagesAdapter } from './conversation.reducer';
import { createSelector } from '@ngrx/store';
import { selectConversationState } from '../../../core/core.state';
import { ConversationState } from '../../../shared/models/conversation.model';

const messagesSelector = messagesAdapter.getSelectors();

export const selectConversationMessages = createSelector(
  selectConversationState,
  (state: ConversationState) => state.messages
);

export const selectConversationMessagesTotalResults = createSelector(
  selectConversationMessages,
  messagesSelector.selectTotal
);

export const selectConversationAllMessages = createSelector(
  selectConversationMessages,
  messagesSelector.selectAll
);

export const selectConversationMessagesLoading = createSelector(
  selectConversationState,
  (state: ConversationState) => state.messagesLoading
);

export const selectConversation = createSelector(
  selectConversationState,
  (state: ConversationState) => state.conversation
);

export const selectConversationLoading = createSelector(
  selectConversationState,
  (state: ConversationState) => state.conversationsLoading
);
