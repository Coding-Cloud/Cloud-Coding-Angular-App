export interface Message {
  id: string;
  userId: string;
  assetId: string;
  conversationId: string;
  content: string;
  createdAt: Date;
}
