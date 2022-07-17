import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { EditProjectDTO } from './dto/edit-project-dto';
import { RenameProjectFolderResource } from './resource/rename-project-folder-resource';

@Injectable({
  providedIn: 'root'
})
export class SocketVideoService {
  socket: Socket | undefined;

  readonly uri: string = 'http://turn.machavoine.fr:5000';

  constructor() {}

  disconnect(): void {
    this.socket?.emit('disconnectCustom');
  }

  connect(username: string): void {
    this.socket = io(this.uri, {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        user: username
      }
    });
  }

  listenNewCall(): Observable<EditProjectDTO[]> {
    return new Observable((subscriber) => {
      this.socket?.on('newCall', (data) => {
        console.info('newCall event');
        console.log(data);
        subscriber.next(data);
      });
    });
  }

  listenCallAnswered(): Observable<RenameProjectFolderResource> {
    return new Observable((subscriber) => {
      this.socket?.on('callAnswered', (data) => {
        console.info('callAnswered event');
        subscriber.next(data);
      });
    });
  }

  listenCallIceCandidate(): Observable<RenameProjectFolderResource> {
    return new Observable((subscriber) => {
      this.socket?.on('ICEcandidate', (data) => {
        console.info('ICEcandidate event');
        subscriber.next(data);
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
}
