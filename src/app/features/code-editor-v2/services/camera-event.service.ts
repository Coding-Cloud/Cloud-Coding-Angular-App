import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraEventService {
  newCallTriggered$ = new Subject<void>();

  constructor() {}

  triggerNewCall(): void {
    console.log('on a bien triger la valeur');
    this.newCallTriggered$.next();
  }

  listenNewCallTriggered(): Subject<void> {
    return this.newCallTriggered$;
  }
}
