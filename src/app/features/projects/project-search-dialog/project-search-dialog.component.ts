import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { selectAllProjectsSearch } from '../store/projects.selectors';
import {
  actionProjectsSearch,
  actionProjectsSearchInit
} from '../store/projects.actions';

@Component({
  selector: 'cc-project-search-dialog',
  templateUrl: './project-search-dialog.component.html',
  styleUrls: ['./project-search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSearchDialogComponent implements OnInit {
  projectResults$: Observable<Project[]>;

  constructor(
    public dialogRef: MatDialogRef<ProjectSearchDialogComponent>,
    private store: Store<AppState>
  ) {
    this.projectResults$ = this.store.pipe(select(selectAllProjectsSearch));
  }

  ngOnInit(): void {
    this.store.dispatch(actionProjectsSearchInit());
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSearch(event: Event) {
    const search = (event.target as HTMLInputElement).value;
    if (search.length >= 3) {
      this.store.dispatch(actionProjectsSearch({ search }));
    }
  }
}
