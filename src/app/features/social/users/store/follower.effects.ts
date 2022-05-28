import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';

@Injectable()
export class FollowersEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
