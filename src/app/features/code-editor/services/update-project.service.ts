import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectService {
  private baseUrl = 'http://localhost:3000/api/diff';

  constructor(private http: HttpClient) {}

  updateProject(projectCode: any): Observable<void> {
    console.log(projectCode);
    const jsonClient = { jsonClient: projectCode };
    return this.http
      .post<any>(`${this.baseUrl}`, jsonClient)
      .pipe(map(() => {}));
  }
}
