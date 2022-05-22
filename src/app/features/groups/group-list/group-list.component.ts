import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { groupsNavigation } from '../groups-routing.module';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { Observable } from 'rxjs';
import { Group } from '../../../shared/models/group.model';
import {
  actionGroupsRetrieveAllJoined,
  actionGroupsRetrieveAllOwned
} from '../store/groups.actions';
import {
  selectAllJoinedGroups,
  selectAllOwnedGroups
} from '../store/groups.selectors';
import { userViewLink } from '../../social/users/users-routing.module';

@Component({
  selector: 'cc-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent implements OnInit {
  groupsLinks = groupsNavigation;
  userViewLink = userViewLink;

  ownedGroupList$: Observable<Group[]>;
  joinedGroupList$: Observable<Group[]>;

  constructor(private store: Store<AppState>) {
    this.ownedGroupList$ = this.store.pipe(select(selectAllOwnedGroups));
    this.joinedGroupList$ = this.store.pipe(select(selectAllJoinedGroups));
  }

  ngOnInit(): void {
    this.store.dispatch(actionGroupsRetrieveAllOwned());
    this.store.dispatch(actionGroupsRetrieveAllJoined());
  }
}
