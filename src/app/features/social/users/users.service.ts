import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resource-uri';
import { Observable, of } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { HttpTools } from '../../../shared/http-tools/http-tools';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(API_RESOURCE_URI.USERS + '/' + userId);
  }

  getUsername(userId: string): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(
      API_RESOURCE_URI.USERNAME(userId)
    );
  }

  searchUsersDialog(search: string): Observable<User[]> {
    return this.http.get<User[]>(API_RESOURCE_URI.USERS_SEARCH + '/' + search);
  }

  searchUsers(
    offset: number,
    limit: number,
    search?: string
  ): Observable<{ users: User[]; totalResults: number }> {
    return of({
      users: [
        {
          id: '1',
          username: 'test',
          firstname: 'test',
          lastname: 'test',
          email: 'test@example.com',
          birthdate: new Date()
        },
        {
          id: '2',
          username: 'test',
          firstname: 'test',
          lastname: 'test',
          email: 'test@example.com',
          birthdate: new Date()
        }
      ],
      totalResults: 5
    });

    return this.http.get<{ users: User[]; totalResults: number }>(
      API_RESOURCE_URI.USERS,
      {
        params: HttpTools.objectToHttpParams({ search, limit, offset })
      }
    );
  }
}