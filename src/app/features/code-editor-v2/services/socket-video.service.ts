import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketVideoService {
  socket: Socket | undefined;

  readonly uri: string = environment.cameraSocketUrl;

  constructor() {}

  disconnect(): void {
    this.socket?.emit('disconnectCustom');
  }

  connect(username: string, room: string): void {
    this.socket = io(this.uri, {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        user: username,
        room: room
      }
    });
  }

  listenNewCall(): Observable<{ caller: string; rtcMessage: any }> {
    return new Observable((subscriber) => {
      this.socket?.on(
        'newCall',
        (data: { caller: string; rtcMessage: any }) => {
          console.info('newCall event');
          console.log(data);
          subscriber.next(data);
        }
      );
    });
  }

  listenCallAnswered(): Observable<{ callee: string; rtcMessage: any }> {
    return new Observable((subscriber) => {
      this.socket?.on(
        'callAnswered',
        (data: { callee: string; rtcMessage: any }) => {
          console.info('callAnswered event');
          console.info(data);
          subscriber.next(data);
        }
      );
    });
  }

  listenCallIceCandidate(): Observable<{ sender: string; rtcMessage: any }> {
    return new Observable((subscriber) => {
      this.socket?.on(
        'ICEcandidate',
        (data: { sender: string; rtcMessage: any }) => {
          console.info('ICEcandidate event');
          subscriber.next(data);
        }
      );
    });
  }

  listenGetAllUsersToJoin(): Observable<string[]> {
    return new Observable((subscriber) => {
      this.socket?.on('getAllUsersToJoin', (users: string[]) => {
        console.info('GetAllUsersToJoin event');
        subscriber.next(users);
      });
    });
  }

  listenNewCallByJoin(): Observable<{
    caller: string;
    rtcMessage: any;
  }> {
    return new Observable((subscriber) => {
      this.socket?.on(
        'newCallByJoin',
        (data: { caller: string; rtcMessage: any }) => {
          console.info('newCallByJoin event');
          subscriber.next(data);
        }
      );
    });
  }

  listenUserIsDisconnected(): Observable<{
    user: string;
  }> {
    return new Observable((subscriber) => {
      this.socket?.on('userDisconnected', (data: { user: string }) => {
        console.info('user is disconnected');
        subscriber.next(data);
      });
    });
  }

  listenYouHaveToJoin(): Observable<void> {
    return new Observable((subscriber) => {
      this.socket?.on('youHaveToJoin', () => {
        subscriber.next();
      });
    });
  }

  listenYouHaveToCall(): Observable<void> {
    return new Observable((subscriber) => {
      this.socket?.on('youHaveToCall', () => {
        subscriber.next();
      });
    });
  }

  sendCall(data: any) {
    console.log('send a call in service');
    this.socket?.emit('call', data);
  }

  sendIceCandidate(data: any) {
    this.socket?.emit('ICEcandidate', data);
  }

  sendAnswerCall(data: any) {
    this.socket?.emit('answerCall', data);
  }

  sendGetUserToJoin(data: { room: string }) {
    this.socket?.emit('getUsersToJoin', data);
  }

  sendJoinConversation(data: any) {
    this.socket?.emit('joinConversation', data);
  }

  sendDisconnectEvent() {
    this.socket?.emit('disconnected');
  }

  sendAskIfHasToJoin(data: { room: string }) {
    this.socket?.emit('hasToJoinOrCall', data);
  }
}
