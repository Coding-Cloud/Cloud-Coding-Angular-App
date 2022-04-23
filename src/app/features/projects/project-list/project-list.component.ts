import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { selectAllProjects } from '../store/projects.selectors';
import { projectsNavigation } from '../projects-routing.module';
import { actionProjectsRetrieveAll } from '../store/projects.actions';

@Component({
  selector: 'cc-projects',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projectsLinks = projectsNavigation;

  projectList$: Observable<Project[]> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actionProjectsRetrieveAll());
    this.projectList$ = this.store.pipe(select(selectAllProjects));
  }
}