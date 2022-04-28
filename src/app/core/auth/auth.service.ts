import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import {
  UpdateUserForm,
  UpdateUserPasswordForm,
  User,
  UserForm
} from '../../shared/models/user.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      API_RESOURCE_URI.AUTH_SIGNIN,
      {
        username,
        password
      }
    );
  }

  logout(): Observable<any> {
    return this.http.delete(API_RESOURCE_URI.AUTH_SIGNOUT);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(API_RESOURCE_URI.AUTH_ME);
  }

  register(userForm: UserForm): Observable<{ user: UserForm }> {
    return this.http
      .post<void>(API_RESOURCE_URI.AUTH_SIGNUP, {
        ...userForm
      })
      .pipe(
        map(() => ({
          user: {
            ...userForm
          }
        }))
      );
  }

  update(userForm: UpdateUserForm): Observable<any> {
    return this.http.patch<any>(API_RESOURCE_URI.AUTH, {
      ...userForm
    });
  }

  updatePassword(userPasswordForm: UpdateUserPasswordForm): Observable<any> {
    return this.http.patch<any>(API_RESOURCE_URI.AUTH_PASSWORD, {
      ...userPasswordForm
    });
  }
}
