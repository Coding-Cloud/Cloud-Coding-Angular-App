import { EntityState } from '@ngrx/entity';
import { Message } from './message.model';

export interface Conversation {
  id: string;
  friendshipId?: string;
  groupId?: string;
  createdAt: Date;
}

export interface ConversationState {
  conversation: Conversation;
  conversationsLoading: boolean;
  messages: EntityState<Message>;
  messagesLoading: boolean;
}
