import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resource-uri';
import {
  FriendRequest,
  Friendship
} from '../../../shared/models/friendship.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {
  constructor(private http: HttpClient) {}

  sendFriendRequest(userId: string): Observable<void | null> {
    console.log('sendFriendRequest', userId);
    return of(null);
    return this.http.post<void>(
      API_RESOURCE_URI.FRIEND_REQUESTS_SEND + '/' + userId,
      {}
    );
  }

  acceptFriendRequest(userId: string): Observable<string> {
    // returns friendshipId
    return this.http.post(
      API_RESOURCE_URI.FRIEND_REQUESTS_ACCEPT + '/' + userId,
      {},
      { responseType: 'text' }
    );
  }

  cancelFriendRequest(userId: string): Observable<void> {
    return this.http.delete<void>(
      API_RESOURCE_URI.FRIEND_REQUESTS_CANCEL + '/' + userId
    );
  }

  rejectFriendRequest(userId: string): Observable<void> {
    return this.http.delete<void>(
      API_RESOURCE_URI.FRIEND_REQUESTS_REJECT + '/' + userId
    );
  }

  retrieveReceivedFriendRequests(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(
      API_RESOURCE_URI.FRIEND_REQUESTS_RECEIVED
    );
  }

  retrieveSentFriendRequests(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(
      API_RESOURCE_URI.FRIEND_REQUESTS_SENT
    );
  }

  retrieveFriends(): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(API_RESOURCE_URI.FRIENDSHIPS);
  }

  removeFriend(friendshipId: string): Observable<void> {
    return this.http.delete<void>(
      API_RESOURCE_URI.FRIENDSHIPS + '/' + friendshipId
    );
  }

  retrieveFriendship(userId: string): Observable<Friendship | null> {
    console.log('retrieveFriendship', userId);
    return of(null);
    return of({
      id: '123456',
      createdAt: new Date(),
      user1Id: '650803f3-078b-4852-9959-7d29199120ab',
      user2Id: 'f5367555-5080-4704-b29c-906bd7565fa4'
    });
    return this.http
      .get<Friendship>(API_RESOURCE_URI.FRIENDSHIPS + '/' + userId)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of(null);
          }
          return throwError(error);
        })
      );
  }

  retrieveFriendRequest(userId: string): Observable<FriendRequest | null> {
    console.log('retrieveFriendRequest', userId);
    return of(null);
    return of({
      createdAt: new Date(),
      requestedUserId: 'f5367555-5080-4704-b29c-906bd7565fa4',
      requesterUserId: '650803f3-078b-4852-9959-7d29199120ab'
    });
    return this.http
      .get<FriendRequest>(API_RESOURCE_URI.FRIEND_REQUESTS + '/' + userId)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of(null);
          }
          return throwError(error);
        })
      );
  }
}
