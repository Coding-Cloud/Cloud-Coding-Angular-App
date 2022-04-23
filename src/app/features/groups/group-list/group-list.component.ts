import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { groupsNavigation } from '../groups-routing.module';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { Observable } from 'rxjs';
import { Group } from '../../../shared/models/group.model';
import { actionGroupsRetrieveAll } from '../store/groups.actions';
import { selectAllGroups } from '../store/groups.selectors';

@Component({
  selector: 'cc-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent implements OnInit {
  groupsLinks = groupsNavigation;

  groupList$: Observable<Group[]> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actionGroupsRetrieveAll());
    this.groupList$ = this.store.pipe(select(selectAllGroups));
  }
}
