import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { EditProjectDTO } from './dto/edit-project-dto';

@Injectable({
  providedIn: 'root'
})
export class CodeSocketService {
  socket: Socket | undefined;

  readonly uri: string = 'http://localhost:3000';

  constructor() {}

  disconnect(): void {
    this.socket?.emit('disconnectCustom');
  }

  connect(roomId?: number, sessionToken?: string): void {
    this.socket = io(this.uri, {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        room: roomId,
        userToken: sessionToken
      }
    });
  }

  sendProjectModification(
    eventName: string,
    editProjectDTO: EditProjectDTO[]
  ): void {
    console.log('envoi de socket');

    this.socket?.emit(eventName, { project: editProjectDTO });
  }
}
