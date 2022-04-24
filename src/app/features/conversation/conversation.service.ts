import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { Observable } from 'rxjs';
import { Message } from '../../shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  getMessages(conversationId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      API_RESOURCE_URI.MESSAGES + '/' + conversationId
    );
  }
}
