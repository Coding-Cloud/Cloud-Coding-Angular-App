import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import {
  selectAllUsersSearch,
  selectUsersSearchLoading,
  selectUsersSearchTotalResults
} from '../store/users.selectors';
import {
  actionUsersSearch,
  actionUsersSearchInit
} from '../store/users.actions';
import { usersNavigation, userViewLink } from '../users-routing.module';
import { Router } from '@angular/router';
import { socialNavigation } from '../../social-routing.module';

@Component({
  selector: 'cc-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchComponent implements OnInit {
  readonly usersNavigation = usersNavigation;
  userResults$: Observable<User[]>;
  userTotalResults$: Observable<number>;
  loading$: Observable<boolean>;
  searchQuery = new FormControl('');

  pageIndex = 0;
  pageSize = 10;

  readonly displayedColumns = ['row'];

  constructor(private store: Store<AppState>, private router: Router) {
    this.userResults$ = this.store.pipe(select(selectAllUsersSearch));
    this.userTotalResults$ = this.store.pipe(
      select(selectUsersSearchTotalResults)
    );
    this.loading$ = this.store.pipe(select(selectUsersSearchLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(actionUsersSearchInit());
    this.store.dispatch(
      actionUsersSearch({
        limit: this.pageSize,
        page: this.pageIndex
      })
    );
  }

  isInRouteLink(): boolean {
    return this.router.url.includes(socialNavigation.users.path);
  }

  getRootClasse(): string {
    return this.isInRouteLink() ? 'container' : '';
  }

  onSearch(pageIndex = 0) {
    this.pageIndex = pageIndex;
    const searchValue = this.searchQuery.value.trim();
    this.store.dispatch(
      actionUsersSearch({
        search: searchValue.length > 0 ? searchValue : undefined,
        limit: this.pageSize,
        page: this.pageIndex
      })
    );
  }

  onSearchPage(pageIndex: number, pageSize: number) {
    this.pageSize = pageSize;
    this.onSearch(pageIndex);
  }

  onClick(user: User) {
    this.router.navigate([userViewLink, user.id]);
  }
}
