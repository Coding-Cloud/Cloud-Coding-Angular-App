import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { User, UserForm } from '../../shared/models/user.models';
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
    /*     return of({
          token: 'fake-jwt-token',
          user: {
            id: '1',
            username: 'test',
            firstname: 'test',
            lastname: 'test',
            birthdate: new Date(1997, 1, 1),
            email: 'test@example.com',
            createdAt: new Date()
          }
        }); */

    return this.http.post<{ accessToken: string }>(
      API_RESOURCE_URI.AUTH_SIGNIN,
      {
        username,
        password
      }
    );
  }

  logout(id: number) {
    return this.http.post<any>(`${API_RESOURCE_URI.AUTH_SIGNOUT}/${id}`, {});
  }

  getMe(): Observable<User> {
    return of({
      id: '1',
      username: 'test',
      firstname: 'test',
      lastname: 'test',
      birthdate: new Date(1997, 1, 1),
      email: 'test@example.com',
      createdAt: new Date()
    });

    return this.http.get<User>(API_RESOURCE_URI.AUTH_ME);
  }

  register(userForm: UserForm): Observable<{ user: UserForm }> {
    /*     return of({
          user: {
            ...userForm
          }
        }); */

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
}
