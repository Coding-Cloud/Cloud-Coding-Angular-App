import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectService {
  private baseUrl = `${env.apiUrl}/api/diff`;

  constructor(private http: HttpClient) {}

  updateProject(projectCode: any): Observable<void> {
    const jsonClient = { jsonClient: projectCode };
    return this.http
      .post<any>(`${this.baseUrl}`, jsonClient)
      .pipe(map(() => {}));
  }
}
