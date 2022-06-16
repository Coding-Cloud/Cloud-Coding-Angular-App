import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { Observable } from 'rxjs';
import {
  CreateMessage,
  Message,
  UpdateMessage
} from '../../shared/models/message.model';
import { Conversation } from '../../shared/models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  // ---------------------------- CONVERSATIONS ----------------------------

  getConversationByFriendship(friendshipId: string): Observable<Conversation> {
    console.log('friendshipId', friendshipId);
    return this.http.get<Conversation>(
      API_RESOURCE_URI.CONVERSATIONS_FRIENDSHIP + '/' + friendshipId
    );
  }

  getConversationByGroup(groupId: string): Observable<Conversation> {
    console.log('groupId', groupId);
    return this.http.get<Conversation>(
      API_RESOURCE_URI.CONVERSATIONS_GROUP + '/' + groupId
    );
  }

  // ------------------------------ MESSAGES ------------------------------

  sendMessage(message: CreateMessage): Observable<string> {
    return this.http.post<string>(
      API_RESOURCE_URI.MESSAGES + '/' + message.conversationId,
      { ...message, assetId: '' }
    );
  }

  updateMessage(message: UpdateMessage): Observable<void> {
    return this.http.patch<void>(API_RESOURCE_URI.MESSAGES + '/' + message.id, {
      ...message,
      assetId: ''
    });
  }

  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(API_RESOURCE_URI.MESSAGES + '/' + messageId);
  }

  getMessages(
    conversationId: string
  ): Observable<{ messages: Message[]; totalResults: number }> {
    return this.http.get<{ messages: Message[]; totalResults: number }>(
      API_RESOURCE_URI.MESSAGES + '/' + conversationId
    );
  }
}
