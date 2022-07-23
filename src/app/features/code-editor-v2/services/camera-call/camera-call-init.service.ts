import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraCallInitService {
  public hasToJoin$ = new BehaviorSubject<string>('');

  constructor() {}

  public triggerHasToJoin(projectUniqueName: string): void {
    this.hasToJoin$.next(projectUniqueName);
  }

  public listenAskIfHasToJoin(): BehaviorSubject<string> {
    return this.hasToJoin$;
  }
}
