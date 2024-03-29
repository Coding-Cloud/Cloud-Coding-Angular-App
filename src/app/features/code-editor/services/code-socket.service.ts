import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { EditProjectDTO } from './dto/edit-project-dto';
import { RenameProjectFolderDTO } from './dto/rename-project-folder-dto';
import { RenameProjectFolderResource } from './resource/rename-project-folder-resource';
import { DeleteProjectFolderResource } from './resource/delete-project-folder-resource';
import { DeleteProjectFolderDTO } from './dto/delete-project-folder-dto';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeSocketService {
  socket: Socket | undefined;

  readonly uri: string = env.socketUrl;

  constructor() {}

  disconnect(): void {
    this.socket?.emit('disconnectCustom');
  }

  connect(projectId: string): void {
    this.socket = io(this.uri, {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        projectId
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

  listenDeleteProjectFolderName(): Observable<DeleteProjectFolderResource> {
    return new Observable((subscriber) => {
      this.socket?.on('deleteProjectFolder', (data) => {
        subscriber.next(data);
      });
    });
  }

  listenLogsChanged(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket?.on('logChanged', (data) => {
        subscriber.next(data);
      });
    });
  }

  renameProjectFolder(renameProjectFolderDTO: RenameProjectFolderDTO): void {
    this.socket?.emit('renameFolder', renameProjectFolderDTO);
  }

  deleteProjectFolder(path: string): void {
    const lastElement = path.split('/').pop() as string;
    const type =
      lastElement[0] !== '.' && lastElement?.includes('.') ? 'file' : 'dir';
    const deleteProjectFolderDTO: DeleteProjectFolderDTO = { path, type };
    this.socket?.emit('deleteFolder', deleteProjectFolderDTO);
  }
}
