import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { EditProjectDTO } from './dto/edit-project-dto';
import { RenameProjectFolderDTO } from './dto/rename-project-folder-dto';
import { RenameProjectFolderResource } from './dto/rename-project-folder-resource';

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
        projectId: 1
      }
    });
  }

  sendProjectModification(
    eventName: string,
    editProjectDTO: EditProjectDTO[]
  ): void {
    this.socket?.emit(eventName, { project: editProjectDTO });
  }

  listenProjectModification(eventName: string): Observable<EditProjectDTO[]> {
    return new Observable((subscriber) => {
      this.socket?.on(eventName, (data) => {
        console.log(data);
        subscriber.next(data);
      });
    });
  }

  listenRenameProjectFolderName(): Observable<RenameProjectFolderResource> {
    return new Observable((subscriber) => {
      this.socket?.on('renameProjectFolder', (data) => {
        subscriber.next(data);
      });
    });
  }

  renameProjectFolder(renameProjectFolderDTO: RenameProjectFolderDTO): void {
    this.socket?.emit('renameFolder', renameProjectFolderDTO);
  }
}
