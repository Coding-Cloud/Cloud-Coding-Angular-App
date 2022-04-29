import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { selectAllProjectsSearch } from '../store/projects.selectors';
import {
  actionProjectsSearch,
  actionProjectsSearchInit
} from '../store/projects.actions';
import { FormControl } from '@angular/forms';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'cc-project-search-dialog',
  templateUrl: './project-search-dialog.component.html',
  styleUrls: ['./project-search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSearchDialogComponent implements OnInit {
  projectResults$: Observable<Project[]>;
  selectedProject: Project | undefined;
  searchControl = new FormControl('');
  searchDebounce?: Timeout;

  constructor(
    public dialogRef: MatDialogRef<ProjectSearchDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      groupIdIgnore?: string;
      projectIdIgnore?: string;
      projectNameIgnore?: string;
    }
  ) {
    this.projectResults$ = this.store.pipe(select(selectAllProjectsSearch));
  }

  ngOnInit(): void {
    this.store.dispatch(actionProjectsSearchInit());
  }

  onClose(): void {
    this.dialogRef.close(this.selectedProject);
  }

  onOptionSelect(project: Project): void {
    this.selectedProject = project;
    this.searchControl.patchValue(project.name);
  }

  isIgnored(project: Project): boolean {
    return (
      project.id === this.data.projectIdIgnore ||
      project.name === this.data.projectNameIgnore ||
      project.groupId === this.data.groupIdIgnore
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
          actionProjectsSearch({ search: this.searchControl.value })
        );
      }, 150);
    }
  }
}
