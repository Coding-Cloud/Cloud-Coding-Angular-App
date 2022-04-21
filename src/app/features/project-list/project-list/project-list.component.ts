import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { selectAllProjects } from '../store/project-list.selectors';
import { projectListNavigation } from '../project-list-routing.module';
import { actionProjectsRetrieveAll } from '../store/project-list.actions';

@Component({
  selector: 'cc-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projectsLinks = projectListNavigation;

  projectList$: Observable<Project[]> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actionProjectsRetrieveAll());
    this.projectList$ = this.store.pipe(select(selectAllProjects));
  }
}
