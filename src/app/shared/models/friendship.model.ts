import { EntityState } from '@ngrx/entity';

export interface FriendRequest {
  requesterUserId: string;
  requestedUserId: string;
  createdAt: Date;
}

export interface Friendship {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
}

export interface FriendshipsState {
  friendships: EntityState<Friendship>;
  loading: boolean;
}

export interface FriendRequestsState {
  sentFriendRequests: EntityState<FriendRequest>;
  sentFriendRequestsLoading: boolean;
  receivedFriendRequests: EntityState<FriendRequest>;
  receivedFriendRequestsLoading: boolean;
}
