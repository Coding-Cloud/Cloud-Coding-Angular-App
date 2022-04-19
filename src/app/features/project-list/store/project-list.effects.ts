import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AppState } from '../../../core/core.state';

@Injectable()
export class ProjectListEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
