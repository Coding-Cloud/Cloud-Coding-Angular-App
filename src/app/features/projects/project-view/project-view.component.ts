import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../core/core.state';
import { select, Store } from '@ngrx/store';
import {
  actionProjectsDeleteOne,
  actionProjectsGetOne,
  actionProjectSwitchEditMode
} from '../store/projects.actions';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import {
  selectCurrentProject,
  selectCurrentProjectGroup,
  selectCurrentProjectIsEditMode
} from '../store/projects.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { groupsNavigation } from '../../groups/groups-routing.module';
import { navigation } from '../../../app-routing.module';
import { Group } from '../../../shared/models/group.model';
import { User } from '../../../shared/models/user.model';
import { selectUser } from '../../../core/auth/auth.selectors';
import { userViewLink } from '../../social/users/users-routing.module';
import { Comment } from '../../../shared/models/comment.model';
import {
  selectAllComments,
  selectCommentsLoading
} from '../../social/comments/store/comments.selectors';
import {
  actionCommentsAddOne,
  actionCommentsGetFromProject,
  actionCommentsInit
} from '../../social/comments/store/comments.actions';

@Component({
  selector: 'cc-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewComponent implements OnInit {
  projectId = '';
  groupId = '';
  ownerId = '';
  currentUserId = '';
  groupsLinks = groupsNavigation;
  rootLinks = navigation;
  groupViewLink = `/${this.rootLinks.groups.path}/${this.groupsLinks.viewGroup.path}`;
  userViewLink = userViewLink;

  project$: Observable<Project>;
  group$: Observable<Group>;
  editMode$: Observable<boolean>;
  currentUser$: Observable<User>;
  projectComments$: Observable<Comment[]>;
  projectCommentsLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.project$ = this.store.pipe(select(selectCurrentProject));
    this.group$ = this.store.pipe(select(selectCurrentProjectGroup));
    this.editMode$ = this.store.pipe(select(selectCurrentProjectIsEditMode));
    this.projectComments$ = this.store.pipe(select(selectAllComments));
    this.projectCommentsLoading$ = this.store.pipe(
      select(selectCommentsLoading)
    );
    this.currentUser$ = this.store.pipe(select(selectUser));

    this.project$.subscribe((project) => {
      this.groupId = project.groupId;
      this.ownerId = project.creatorId;
    });
    this.currentUser$.subscribe((user) => (this.currentUserId = user.id));
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(actionProjectsGetOne({ id: this.projectId }));
    this.store.dispatch(actionCommentsInit());
    this.store.dispatch(
      actionCommentsGetFromProject({ projectId: this.projectId })
    );
  }

  onDelete(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Suppression d'un projet",
        message: 'Êtes vous sûr de vouloir supprimer ce projet ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(actionProjectsDeleteOne({ id: this.projectId }));
      }
    });
  }

  onEditSwitch() {
    this.store.dispatch(actionProjectSwitchEditMode());
  }

  onCommentSubmit(commentContent: string) {
    this.store.dispatch(
      actionCommentsAddOne({
        comment: {
          content: commentContent,
          projectId: this.projectId
        }
      })
    );
  }
}
