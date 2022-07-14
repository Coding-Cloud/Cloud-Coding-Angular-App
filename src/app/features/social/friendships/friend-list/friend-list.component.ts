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
import {
  actionConversationsRetrieveOneByFriendship,
  actionConversationsSendMessage
} from '../../../conversation/store/conversation.actions';
import {
  selectConversation,
  selectConversationLoading
} from '../../../conversation/store/conversation.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

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
  conversationId = '';
  conversationLoading$: Observable<boolean>;

  friendships$: Observable<Friendship[]>;
  friendshipLoading$: Observable<boolean>;

  userViewLink = userViewLink;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.friendships$ = this.store.select(selectAllFriendships);
    this.friendshipLoading$ = this.store.select(selectFriendshipsLoading);
    this.conversationLoading$ = this.store.select(selectConversationLoading);

    this.store.select(selectUser).subscribe((user) => {
      this.currentUserId = user.id;
    });
    this.store.select(selectConversation).subscribe((conversation) => {
      this.conversationId = conversation.id;
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
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Retirer ami',
          message: 'Voulez-vous vraiment retirer cet ami ?'
        }
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed === true) {
          this.store.dispatch(actionFriendshipsRemoveOne({ friendshipId }));
        }
      });
  }

  onFriendshipClick(friendship: Friendship): void {
    if (this.showConversation) {
      this.store.dispatch(
        actionConversationsRetrieveOneByFriendship({
          friendshipId: friendship.id
        })
      );
    }
  }

  onMessageSend(content: string): void {
    if (content.length > 0) {
      this.store.dispatch(
        actionConversationsSendMessage({
          message: {
            content,
            conversationId: this.conversationId
          }
        })
      );
    }
  }
}
