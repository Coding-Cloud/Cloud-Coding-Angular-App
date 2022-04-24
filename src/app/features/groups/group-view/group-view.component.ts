import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReducerObservable, select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { MatDialog } from '@angular/material/dialog';
import {
  actionGroupsDeleteOne,
  actionGroupsGetOne,
  actionGroupSwitchEditMode
} from '../store/groups.actions';
import { Observable } from 'rxjs';
import { Group, GroupMembership } from '../../../shared/models/group.model';
import {
  selectCurrentGroup,
  selectCurrentGroupIsEditMode,
  selectCurrentGroupMembers
} from '../store/groups.selectors';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { navigation } from '../../../app-routing.module';
import { projectsNavigation } from '../../projects/projects-routing.module';
import { User } from '../../../shared/models/user.model';
import { selectUser } from '../../../core/auth/auth.selectors';

@Component({
  selector: 'cc-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupViewComponent implements OnInit {
  groupId = '';
  group$: Observable<Group>;
  members$: Observable<GroupMembership[]>;
  editMode$: Observable<boolean>;
  currentUser$: Observable<User> | undefined;

  projectsLinks = projectsNavigation;
  rootLinks = navigation;
  projectViewLink = `/${this.rootLinks.projets.path}/${this.projectsLinks.viewProject.path}`;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.group$ = this.store.pipe(select(selectCurrentGroup));
    this.members$ = this.store.pipe(select(selectCurrentGroupMembers));
    this.editMode$ = this.store.pipe(select(selectCurrentGroupIsEditMode));
    this.currentUser$ = this.store.pipe(select(selectUser));
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
        this.store.dispatch(actionGroupsDeleteOne({ id: this.groupId }));
      }
    });
  }

  onEditSwitch() {
    this.store.dispatch(actionGroupSwitchEditMode());
  }
}
