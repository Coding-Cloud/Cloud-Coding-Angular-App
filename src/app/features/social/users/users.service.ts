import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resource-uri';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';

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

  searchUsers(search: string): Observable<User[]> {
    return this.http.get<User[]>(API_RESOURCE_URI.USERS_SEARCH + '/' + search);
  }
}
