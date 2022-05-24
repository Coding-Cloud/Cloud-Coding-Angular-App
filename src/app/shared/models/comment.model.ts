import { EntityState } from '@ngrx/entity';

export interface Comment {
  id: string;
  ownerId: string;
  projectId: string;
  content: string;
  createdAt: Date;
}

export interface CreateComment {
  projectId: string;
  content: string;
}

export interface UpdateComment {
  id: string;
  content: string;
}

export interface CommentsState {
  comments: EntityState<Comment>;
  totalResults: number;
  loading: boolean;
}
