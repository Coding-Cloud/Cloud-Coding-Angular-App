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

export interface UpdateMessage extends CreateMessage {
  id: string;
}
