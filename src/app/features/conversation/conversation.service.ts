import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { Observable } from 'rxjs';
import {
  CreateMessage,
  EventMessageCreated,
  EventMessageType,
  EventMessageUpdated,
  Message,
  UpdateMessage
} from '../../shared/models/message.model';
import { Conversation } from '../../shared/models/conversation.model';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  conversationSocket: Socket | undefined;

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
    return this.http.post(
      API_RESOURCE_URI.MESSAGES + '/' + message.conversationId,
      { ...message },
      { responseType: 'text' }
    );
  }

  updateMessage(message: UpdateMessage): Observable<void> {
    return this.http.patch<void>(
      API_RESOURCE_URI.MESSAGES + '/' + message.messageId,
      {
        ...message
      }
    );
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

  setupConversationSocketConnection(userToken: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.conversationSocket = io(API_RESOURCE_URI.CONVERSATION_SOCKET, {
        transports: ['websocket'],
        query: {
          authorization: `Bearer ${userToken}`
        }
      });
      this.conversationSocket.on('connect', () => {
        console.debug('Conversation socket connected !');
        observer.next();
      });
      this.conversationSocket?.on('disconnect', () => {
        console.debug('Conversation socket disconnected !');
      });
    });
  }

  watchSocket(): Observable<{
    eventType: EventMessageType | string;
    data: string | EventMessageCreated | EventMessageUpdated;
  }> {
    return new Observable((observer) => {
      let event: EventMessageType | string;

      this.conversationSocket?.on(
        EventMessageType.MESSAGE_CREATED,
        (data: EventMessageCreated) => {
          event = EventMessageType.MESSAGE_CREATED;
          observer.next({ eventType: event, data: data });
        }
      );

      this.conversationSocket?.on(
        EventMessageType.MESSAGE_UPDATED,
        (data: EventMessageUpdated) => {
          event = EventMessageType.MESSAGE_UPDATED;
          observer.next({ eventType: event, data: data });
        }
      );

      this.conversationSocket?.on(
        EventMessageType.MESSAGE_DELETED,
        (data: string) => {
          event = EventMessageType.MESSAGE_DELETED;
          observer.next({ eventType: event, data: data });
        }
      );

      this.conversationSocket?.on('exception', (data) => {
        observer.next({ eventType: 'exception', data: data.message });
      });

      return () => this.conversationSocket?.off(event);
    });
  }

  sendMessageSocket(message: CreateMessage): void {
    this.conversationSocket?.emit(EventMessageType.SEND_MESSAGE, message);
  }

  updateMessageSocket(message: UpdateMessage): void {
    this.conversationSocket?.emit(EventMessageType.UPDATE_MESSAGE, message);
  }

  deleteMessageSocket(messageId: string): void {
    this.conversationSocket?.emit(EventMessageType.DELETE_MESSAGE, messageId);
  }
}
