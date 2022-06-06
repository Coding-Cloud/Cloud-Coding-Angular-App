import { EntityState } from '@ngrx/entity';

export type FriendRequest = {
  requesterUserId: string;
  requestedUserId: string;
  createdAt: Date;
};

export type Friendship = {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
};

export type FriendshipsState = {
  friendships: EntityState<Friendship>;
  totalResults: number;
  loading: boolean;
};

export type FriendRequestsState = {
  sentFriendRequests: EntityState<FriendRequest>;
  sentFriendRequestsTotalResults: number;
  sentFriendRequestsLoading: boolean;
  receivedFriendRequests: EntityState<FriendRequest>;
  receivedFriendRequestsTotalResults: number;
  receivedFriendRequestsLoading: boolean;
};
