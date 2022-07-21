import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  socialFriendRequestsLink,
  socialNavigation
} from '../../social-routing.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import { Observable } from 'rxjs';
import { FriendRequest } from '../../../../shared/models/friendship.model';
import {
  selectAllReceivedFriendRequests,
  selectAllSentFriendRequests,
  selectReceivedFriendRequestsLoading,
  selectSentFriendRequestsLoading
} from '../store/friend-requests.selectors';
import {
  actionFriendRequestsAccept,
  actionFriendRequestsCancel,
  actionFriendRequestsReject,
  actionFriendRequestsRetrieveAll
} from '../store/friend-requests.actions';
import { userViewLink } from '../../users/users-routing.module';

@Component({
  selector: 'cc-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendRequestsComponent implements OnInit {
  receivedFriendRequests$: Observable<FriendRequest[]>;
  receivedFriendRequestsLoading$: Observable<boolean>;
  sentFriendRequests$: Observable<FriendRequest[]>;
  sentFriendRequestsLoading$: Observable<boolean>;

  userViewLink = userViewLink;
  socialFriendRequestsLink = socialFriendRequestsLink;

  constructor(private store: Store<AppState>, private router: Router) {
    this.receivedFriendRequests$ = this.store.select(
      selectAllReceivedFriendRequests
    );
    this.sentFriendRequests$ = this.store.select(selectAllSentFriendRequests);
    this.receivedFriendRequestsLoading$ = this.store.select(
      selectReceivedFriendRequestsLoading
    );
    this.sentFriendRequestsLoading$ = this.store.select(
      selectSentFriendRequestsLoading
    );
  }

  ngOnInit(): void {
    this.store.dispatch(actionFriendRequestsRetrieveAll());
  }

  isInRouteLink(): boolean {
    return this.router.url.includes(socialNavigation.friendRequests.path);
  }

  getRootClasse(): string {
    return this.isInRouteLink() ? 'container' : '';
  }

  onFriendRequestAccept(userId: string): void {
    this.store.dispatch(actionFriendRequestsAccept({ userId }));
  }

  onFriendRequestReject(userId: string): void {
    this.store.dispatch(actionFriendRequestsReject({ userId }));
  }

  onFriendRequestCancel(userId: string): void {
    this.store.dispatch(actionFriendRequestsCancel({ userId }));
  }
}
