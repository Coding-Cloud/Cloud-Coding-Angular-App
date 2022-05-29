import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selectUserViewProjects
} from '../store/users.selectors';
import {
  projectsNavigation,
  projectViewLink
} from '../../../projects/projects-routing.module';
import { navigation } from '../../../../app-routing.module';
import { usersNavigation } from '../users-routing.module';
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

@Component({
  selector: 'cc-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  userId = '';
  user$: Observable<User>;
  projects$: Observable<Project[]>;
  currentUser$: Observable<User>;
  userComments$: Observable<Comment[]>;
  userCommentsLoading$: Observable<boolean>;

  usersNavigation = usersNavigation;
  projectViewLink = projectViewLink;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(selectUserView));
    this.projects$ = this.store.pipe(select(selectUserViewProjects));

    this.userComments$ = this.store.pipe(select(selectAllComments));
    this.userCommentsLoading$ = this.store.pipe(select(selectCommentsLoading));
    this.currentUser$ = this.store.pipe(select(selectUser));
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(actionUsersGetOne({ id: this.userId }));
    this.store.dispatch(actionUsersGetUserProjects({ id: this.userId }));
    this.store.dispatch(actionCommentsInit());
    this.store.dispatch(actionCommentsGetFromUser({ userId: this.userId }));
  }
}
