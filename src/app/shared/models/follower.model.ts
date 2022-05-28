import { EntityState } from '@ngrx/entity';

export interface Follower {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface FollowersState {
  followers: EntityState<Follower>;
  followerTotalResults: number;
  followerLoading: boolean;
  followings: EntityState<Follower>;
  followingTotalResults: number;
  followingLoading: boolean;
}
