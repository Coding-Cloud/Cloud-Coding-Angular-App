export interface Comment {
  id: string;
  ownerId: string;
  postId: string;
  content: string;
  createdAt: Date;
}
