import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import {
  actionUsersGetOne,
  actionUsersGetUserProjects
} from '../store/users.actions';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { Project } from '../../../../shared/models/project.model';
import {
  selectUserView,
  selectUserViewFollowing,
  selectUserViewFriendRequest,
  selectUserViewFriendship,
  selectUserViewProjects
} from '../store/users.selectors';
import { projectViewLink } from '../../../projects/projects-routing.module';
import { usersNavigation, userViewLink } from '../users-routing.module';
import { Comment } from '../../../../shared/models/comment.model';
import {
  selectAllComments,
  selectCommentsLoading
} from '../../comments/store/comments.selectors';
import { selectUser } from '../../../../core/auth/auth.selectors';
import {
  actionCommentsGetFromUser,
  actionCommentsInit
} from '../../comments/store/comments.actions';
import {
  actionFollowersFollow,
  actionFollowersGetFromUser,
  actionFollowersInit,
  actionFollowersIsFollowing,
  actionFollowersUnfollow,
  actionFollowingsGetFromUser,
  actionFollowingsInit
} from '../store/follower.actions';
import { Follower } from '../../../../shared/models/follower.model';
import {
  selectAllFollowers,
  selectAllFollowings,
  selectFollowersLoading,
  selectFollowersTotalResults,
  selectFollowingsLoading,
  selectFollowingsTotalResults
} from '../store/follower.selector';
import {
  FriendRequest,
  Friendship
} from '../../../../shared/models/friendship.model';
import {
  actionFriendshipsGetOne,
  actionFriendshipsRemoveOne
} from '../../friendships/store/friendships.actions';
import {
  actionFriendRequestsAccept,
  actionFriendRequestsCancel,
  actionFriendRequestsReject,
  actionFriendRequestsRetrieveOne,
  actionFriendRequestsSend
} from '../../friendships/store/friend-requests.actions';

@Component({
  selector: 'cc-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  userId = '';
  currentUserId = '';
  user$: Observable<User>;
  projects$: Observable<Project[]>;
  currentUser$: Observable<User>;
  userComments$: Observable<Comment[]>;
  userCommentsLoading$: Observable<boolean>;

  isFollowing$: Observable<boolean>;
  followers$: Observable<Follower[]>;
  followersTotalCount$: Observable<number>;
  followersLoading$: Observable<boolean>;
  followings$: Observable<Follower[]>;
  followingsTotalCount$: Observable<number>;
  followingsLoading$: Observable<boolean>;

  friendship$: Observable<Friendship | null>;
  friendRequest$: Observable<FriendRequest | null>;
  friendshipId = '';

  usersNavigation = usersNavigation;
  projectViewLink = projectViewLink;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.pipe(select(selectUserView));
    this.isFollowing$ = this.store.pipe(select(selectUserViewFollowing));
    this.projects$ = this.store.pipe(select(selectUserViewProjects));

    this.userComments$ = this.store.pipe(select(selectAllComments));
    this.userCommentsLoading$ = this.store.pipe(select(selectCommentsLoading));
    this.currentUser$ = this.store.pipe(select(selectUser));

    this.followers$ = this.store.pipe(select(selectAllFollowers));
    this.followings$ = this.store.pipe(select(selectAllFollowings));
    this.followersTotalCount$ = this.store.pipe(
      select(selectFollowersTotalResults)
    );
    this.followingsTotalCount$ = this.store.pipe(
      select(selectFollowingsTotalResults)
    );
    this.followersLoading$ = this.store.pipe(select(selectFollowersLoading));
    this.followingsLoading$ = this.store.pipe(select(selectFollowingsLoading));

    this.friendship$ = this.store.pipe(select(selectUserViewFriendship));
    this.friendRequest$ = this.store.pipe(select(selectUserViewFriendRequest));

    this.currentUser$.subscribe((user) => {
      this.currentUserId = user.id;
    });
    this.user$.subscribe((user) => {
      if (user.id !== '0' && user.id !== this.currentUserId) {
        this.store.dispatch(actionFollowersIsFollowing({ userId: user.id }));
        this.store.dispatch(actionFriendshipsGetOne({ userId: user.id }));
        this.store.dispatch(
          actionFriendRequestsRetrieveOne({ userId: user.id })
        );
      }
    });
    this.friendship$.subscribe((friendship) => {
      if (friendship) {
        this.friendshipId = friendship.id;
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(actionFollowersInit());
    this.store.dispatch(actionFollowingsInit());
    this.store.dispatch(
      actionFollowingsGetFromUser({
        userId: this.userId,
        limit: 100,
        offset: 0
      })
    );
    this.store.dispatch(
      actionFollowersGetFromUser({
        userId: this.userId,
        limit: 100,
        offset: 0
      })
    );
    this.store.dispatch(actionUsersGetOne({ id: this.userId }));
    this.store.dispatch(actionUsersGetUserProjects({ id: this.userId }));
    this.store.dispatch(actionCommentsInit());
    this.store.dispatch(actionCommentsGetFromUser({ userId: this.userId }));
  }

  onFollow(): void {
    this.store.dispatch(actionFollowersFollow({ userId: this.userId }));
  }

  onUnfollow(): void {
    this.store.dispatch(actionFollowersUnfollow({ userId: this.userId }));
  }

  onFollowerView(userId: string): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([userViewLink, userId]));
  }

  isFriendWith(friendship: Friendship | null): boolean {
    return friendship !== null;
  }

  isFriendRequestPending(friendRequest: FriendRequest | null): boolean {
    return friendRequest !== null;
  }

  isFriendRequestReceived(friendRequest: FriendRequest | null): boolean {
    return friendRequest?.requesterUserId === this.userId;
  }

  onFriendRequestAccept(): void {
    this.store.dispatch(actionFriendRequestsAccept({ userId: this.userId }));
  }

  onFriendRequestSend(): void {
    this.store.dispatch(actionFriendRequestsSend({ userId: this.userId }));
  }

  onFriendRequestReject(): void {
    this.store.dispatch(actionFriendRequestsReject({ userId: this.userId }));
  }

  onFriendRequestCancel(): void {
    this.store.dispatch(actionFriendRequestsCancel({ userId: this.userId }));
  }

  onFriendshipRemove(): void {
    this.store.dispatch(
      actionFriendshipsRemoveOne({ friendshipId: this.friendshipId })
    );
  }
}
