import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CheckHealthResource } from './resource/check-health-resource';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckHealthPathService {
  private baseUrl = `${env.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  checkUrlIsReachable(uniqueName: string, path: string): Observable<boolean> {
    return this.http
      .get<CheckHealthResource>(
        `${this.baseUrl}/unique-name/${uniqueName}/check-health?path=${path}`
      )
      .pipe(map((checkHealth) => checkHealth.reachable));
  }
}
