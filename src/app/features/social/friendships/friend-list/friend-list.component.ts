import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  socialFriendshipsLink,
  socialNavigation
} from '../../social-routing.module';
import { Router } from '@angular/router';
import { Friendship } from '../../../../shared/models/friendship.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import {
  selectAllFriendships,
  selectFriendshipsLoading
} from '../store/friendships.selectors';
import {
  actionFriendshipsRemoveOne,
  actionFriendshipsRetrieveAll
} from '../store/friendships.actions';
import { userViewLink } from '../../users/users-routing.module';
import { selectUser } from '../../../../core/auth/auth.selectors';

@Component({
  selector: 'cc-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendListComponent implements OnInit {
  @Input() showConversation = true;

  socialFriendshipsLink = socialFriendshipsLink;

  currentUserId = '';

  friendships$: Observable<Friendship[]>;
  friendshipLoading$: Observable<boolean>;

  userViewLink = userViewLink;

  constructor(private store: Store<AppState>, private router: Router) {
    this.friendships$ = this.store.select(selectAllFriendships);
    this.friendshipLoading$ = this.store.select(selectFriendshipsLoading);

    this.store.select(selectUser).subscribe((user) => {
      this.currentUserId = user.id;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(actionFriendshipsRetrieveAll());
  }

  isInRouteLink(): boolean {
    return this.router.url.includes(socialNavigation.friendships.path);
  }

  getRootClasse(): string {
    return this.isInRouteLink() ? 'container' : '';
  }

  getOtherUserId(friendship: Friendship): string {
    return friendship.user1Id === this.currentUserId
      ? friendship.user2Id
      : friendship.user1Id;
  }

  onFriendshipRemove(friendshipId: string): void {
    this.store.dispatch(actionFriendshipsRemoveOne({ friendshipId }));
  }
}
