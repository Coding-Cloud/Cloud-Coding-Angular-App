import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Follower } from '../../../shared/models/follower.model';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resource-uri';
import { HttpTools } from '../../../shared/http-tools/http-tools';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {
  constructor(private http: HttpClient) {}

  isFollowing(userId: string): Observable<boolean> {
    return this.http.get<boolean>(
      API_RESOURCE_URI.FOLLOWERS_IS_FOLLOWING(userId)
    );
  }

  getFollowers(
    userId: string,
    limit = 10,
    offset = 0
  ): Observable<{ followers: Follower[]; totalResults: number }> {
    return this.http.get<{ followers: Follower[]; totalResults: number }>(
      API_RESOURCE_URI.FOLLOWERS_FOLLOWERS(userId) +
        '?' +
        HttpTools.objectToHttpParams({ limit, offset })
    );
  }

  getFollowings(
    userId: string,
    limit = 10,
    offset = 0
  ): Observable<{ followers: Follower[]; totalResults: number }> {
    return this.http.get<{ followers: Follower[]; totalResults: number }>(
      API_RESOURCE_URI.FOLLOWERS_FOLLOWINGS(userId) +
        '?' +
        HttpTools.objectToHttpParams({ limit, offset })
    );
  }

  follow(userId: string): Observable<void> {
    return this.http.post<void>(
      API_RESOURCE_URI.FOLLOWERS_FOLLOW + '/' + userId,
      {}
    );
  }

  unfollow(userId: string): Observable<void> {
    return this.http.delete<void>(
      API_RESOURCE_URI.FOLLOWERS_FOLLOW + '/' + userId
    );
  }
}
