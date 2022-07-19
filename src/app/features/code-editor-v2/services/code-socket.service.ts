import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { EditProjectDTO } from './dto/edit-project-dto';
import { RenameProjectFolderDTO } from './dto/rename-project-folder-dto';
import { RenameProjectFolderResource } from './resource/rename-project-folder-resource';
import { DeleteProjectFolderResource } from './resource/delete-project-folder-resource';
import { DeleteProjectFolderDTO } from './dto/delete-project-folder-dto';
import { environment as env } from '../../../../environments/environment';
import { Buffer } from 'buffer';

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

  connect(projectId: string, username: string): void {
    this.socket = io(this.uri, {
      path: '/code-runner',
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        projectId,
        username
      },
      reconnection: true
    });
  }

  sendProjectModification(
    eventName: string,
    editProjectDTO: EditProjectDTO[]
  ): void {
    console.log('emit de modif');

    this.socket?.emit(eventName, { project: editProjectDTO });
  }

  listenProjectModification(eventName: string): Observable<EditProjectDTO[]> {
    return new Observable((subscriber) => {
      this.socket?.on(eventName, (data) => {
        console.info('project modification');
        console.log(data);
        subscriber.next(data);
      });
    });
  }

  listenRenameProjectFolderName(): Observable<RenameProjectFolderResource> {
    return new Observable((subscriber) => {
      this.socket?.on('renameProjectFolder', (data) => {
        console.info('rename project forlder name');
        subscriber.next(data);
      });
    });
  }

  listenDeleteProjectFolderName(): Observable<DeleteProjectFolderResource> {
    return new Observable((subscriber) => {
      this.socket?.on('deleteProjectFolder', (data) => {
        console.info('delete project folder');
        subscriber.next(data);
      });
    });
  }

  listenLogsChanged(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket?.on('logChanged', (data) => {
        console.info('log changer');
        subscriber.next(data);
      });
    });
  }

  listenSiteCanBeShow(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket?.on('siteIsReady', (data) => {
        console.info('site is ready');
        subscriber.next(data);
      });
    });
  }

  listenPlayerConnected(): Observable<string[]> {
    return new Observable((subscriber) => {
      this.socket?.on('developerConnected', (data) => {
        console.info('developerConnected');
        subscriber.next(data);
      });
    });
  }

  listenProjectVersionHasChanged(): Observable<string[]> {
    return new Observable((subscriber) => {
      console.log("j'écoute bien l'event");
      this.socket?.on('currentProjectVersionHasChanged', (data) => {
        console.log('je passe dans le listenProjectVersionHasChanged');
        console.log(data);
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

  uploadPicture(dataBuffer: number[], path: string): void {
    const pictureInBase64 = Buffer.from(dataBuffer).toString('base64');
    this.socket?.emit('uploadImage', { base64: pictureInBase64, path });
  }

  sendPingToSayCanReceiveDevelopers(projectId: string) {
    this.socket?.emit('socketReadyToReceiveDevelopers', { projectId });
  }

  changeVersionEvent(uniqueName: string) {
    this.socket?.emit('currentProjectVersionHasChanged', { uniqueName });
  }

  resolveDependencies(uniqueName: string) {
    this.socket?.emit('resolveDependencies', { uniqueName });
  }

  restartRunner(uniqueName: string) {
    this.socket?.emit('restartRunner', { uniqueName });
  }
}
