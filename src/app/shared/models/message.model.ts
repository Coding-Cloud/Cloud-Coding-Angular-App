export interface Message {
  id: string;
  userId: string;
  assetId: string;
  conversationId: string;
  content: string;
  createdAt: Date;
}

export interface CreateMessage {
  conversationId: string;
  content: string;
}

export interface UpdateMessage {
  messageId: string;
  content: string;
}

export interface EventMessageCreated {
  id: string;
  userId: string;
  assetId: string;
  conversationId: string;
  content: string;
  createdAt: Date;
}

export interface EventMessageUpdated {
  messageId: string;
  content: string;
  assetId: string;
}

export enum EventMessageType {
  MESSAGE_CREATED = 'messageCreated',
  MESSAGE_UPDATED = 'messageUpdated',
  MESSAGE_DELETED = 'messageDeleted',
  SEND_MESSAGE = 'sendMessage',
  UPDATE_MESSAGE = 'updateMessage',
  DELETE_MESSAGE = 'deleteMessage'
}
