import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { MatDialog } from '@angular/material/dialog';
import {
  actionGroupsAddMembership,
  actionGroupsAddProject,
  actionGroupsDeleteOneOwned,
  actionGroupsGetOne,
  actionGroupsRemoveMembership,
  actionGroupsRemoveProject,
  actionGroupsUpdateMembership,
  actionGroupSwitchEditMode
} from '../store/groups.actions';
import { Observable } from 'rxjs';
import { Group, GroupMembership } from '../../../shared/models/group.model';
import {
  selectCurrentGroup,
  selectCurrentGroupIsEditMode,
  selectCurrentGroupMembers,
  selectCurrentGroupMessages
} from '../store/groups.selectors';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { navigation } from '../../../app-routing.module';
import { projectsNavigation } from '../../projects/projects-routing.module';
import { User } from '../../../shared/models/user.model';
import { selectUser } from '../../../core/auth/auth.selectors';
import { Message } from '../../../shared/models/message.model';
import { ProjectSearchDialogComponent } from '../../projects/project-search-dialog/project-search-dialog.component';
import { UserSearchDialogComponent } from '../../social/users/user-search-dialog/user-search-dialog.component';
import { Project } from '../../../shared/models/project.model';
import { map } from 'rxjs/operators';
import {
  usersNavigation,
  userViewLink
} from '../../social/users/users-routing.module';

@Component({
  selector: 'cc-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupViewComponent implements OnInit {
  groupId = '';
  currentUserId = '';
  groupOwnerId = '';
  group$: Observable<Group>;
  members$: Observable<GroupMembership[]>;
  editMode$: Observable<boolean>;
  currentUser$: Observable<User>;
  messages$: Observable<Message[]>;

  projectsLinks = projectsNavigation;
  rootLinks = navigation;
  projectViewLink = `/${this.rootLinks.projets.path}/${this.projectsLinks.viewProject.path}`;
  userViewLink = userViewLink;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.group$ = this.store.pipe(select(selectCurrentGroup));
    this.group$.subscribe((group) => {
      this.groupOwnerId = group.ownerId;
    });
    this.members$ = this.store.pipe(select(selectCurrentGroupMembers));
    this.editMode$ = this.store.pipe(select(selectCurrentGroupIsEditMode));
    this.messages$ = this.store.pipe(select(selectCurrentGroupMessages));
    this.currentUser$ = this.store.pipe(select(selectUser));
    this.currentUser$.subscribe((user) => {
      this.currentUserId = user.id;
    });
  }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(actionGroupsGetOne({ id: this.groupId }));
  }

  onDelete(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Suppression d'un groupe",
        message: 'Êtes vous sûr de vouloir supprimer ce groupe ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(actionGroupsDeleteOneOwned({ id: this.groupId }));
      }
    });
  }

  onRemoveProject(projectId: string): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Enlever un projet',
        message: 'Êtes vous sûr de vouloir retirer projet ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(
          actionGroupsRemoveProject({ projectId, groupId: this.groupId })
        );
      }
    });
  }

  onRemoveMembership(userId: string): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Enlever un membre',
        message: 'Êtes vous sûr de vouloir retirer ce membre ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(
          actionGroupsRemoveMembership({
            groupMembership: {
              groupId: this.groupId,
              userId,
              canEdit: false
            }
          })
        );
      }
    });
  }

  onEditSwitch() {
    this.store.dispatch(actionGroupSwitchEditMode());
  }

  onUpdateMembership(userId: string, canEdit: boolean) {
    this.store.dispatch(
      actionGroupsUpdateMembership({
        groupMembership: { groupId: this.groupId, userId, canEdit }
      })
    );
  }

  onSearchProject() {
    const dialogRef = this.dialog.open(ProjectSearchDialogComponent, {
      data: {
        groupIdsIgnore: [this.groupId]
      },
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result?: Project) => {
      if (result) {
        const project = { ...result, groupId: this.groupId };
        this.store.dispatch(actionGroupsAddProject({ project }));
      }
    });
  }

  onSearchUser() {
    const subscription = this.members$
      .pipe(map((members) => members.map((member) => member.userId)))
      .subscribe((membersIds) => {
        const dialogRef = this.dialog.open(UserSearchDialogComponent, {
          data: {
            userIdsIgnore: membersIds
          },
          width: '400px'
        });
        dialogRef.afterClosed().subscribe((result?: User) => {
          if (result) {
            const groupMembership = {
              groupId: this.groupId,
              userId: result.id,
              canEdit: false
            };
            this.store.dispatch(actionGroupsAddMembership({ groupMembership }));
          }
        });
      });
    subscription.unsubscribe();
  }
}
