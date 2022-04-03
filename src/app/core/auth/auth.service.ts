import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { User } from '../../shared/models/user.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    return of({
      token: 'fake-jwt-token',
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@example.com',
        isActive: true,
        role: 'admin',
        pseudo: 'JohnDoe',
        createdAt: '2020-01-01'
      }
    });

    return this.http.post<{ token: string; user: User }>(
      API_RESOURCE_URI.LOGIN,
      {
        email,
        password
      },
      options
    );
  }

  logout(id: number) {
    return this.http.post<any>(`${API_RESOURCE_URI.LOGOUT}/${id}`, {});
  }
}
