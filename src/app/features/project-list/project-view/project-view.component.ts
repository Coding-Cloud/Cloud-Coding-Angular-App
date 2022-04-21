import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../core/core.state';
import { select, Store } from '@ngrx/store';
import {
  actionProjectsDeleteOne,
  actionProjectsGetOne,
  actionProjectSwitchEditMode
} from '../store/project-list.actions';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import {
  selectCurrentProject,
  selectCurrentProjectIsEditMode
} from '../store/project-list.selectors';
import { projectListNavigation } from '../project-list-routing.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'cc-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewComponent implements OnInit {
  projectId = '';
  projectsLinks = projectListNavigation;

  project$: Observable<Project>;
  editMode$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.project$ = this.store.pipe(select(selectCurrentProject));
    this.editMode$ = this.store.pipe(select(selectCurrentProjectIsEditMode));
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(actionProjectsGetOne({ id: this.projectId }));
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
}
