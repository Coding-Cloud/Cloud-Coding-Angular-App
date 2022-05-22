import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import { selectAllUsersSearch } from '../store/users.selectors';
import {
  actionUsersSearch,
  actionUsersSearchInit
} from '../store/users.actions';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'cc-user-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchDialogComponent implements OnInit {
  userResults$: Observable<User[]>;
  selectedUser: User | undefined;
  searchControl = new FormControl('');
  searchDebounce?: Timeout;

  constructor(
    public dialogRef: MatDialogRef<UserSearchDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userIdsIgnore?: string[];
    }
  ) {
    this.userResults$ = this.store.pipe(select(selectAllUsersSearch));
  }

  ngOnInit(): void {
    this.store.dispatch(actionUsersSearchInit());
  }

  onClose(): void {
    this.dialogRef.close(this.selectedUser);
  }

  onOptionSelect(user: User): void {
    this.selectedUser = user;
    this.searchControl.patchValue(this.formatUser(user));
  }

  formatUser(user: User): string {
    return `${user.username} - ${user.email}`;
  }

  isIgnored(user: User): boolean {
    return <boolean>(
      (this.data.userIdsIgnore && this.data.userIdsIgnore?.includes(user.id))
    );
  }

  onInput() {
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }
    const searchValue = this.searchControl.value;
    if (searchValue.length >= 3) {
      this.searchDebounce = setTimeout(() => {
        this.store.dispatch(
          actionUsersSearch({ search: this.searchControl.value })
        );
      }, 150);
    }
  }
}
