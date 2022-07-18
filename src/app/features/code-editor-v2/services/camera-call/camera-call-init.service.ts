import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraCallInitService {
  public cameraCallIsLive$ = new BehaviorSubject('');

  constructor() {}

  public initCameraCall(projectUniqueName: string): void {
    this.cameraCallIsLive$.next(projectUniqueName);
  }
}
