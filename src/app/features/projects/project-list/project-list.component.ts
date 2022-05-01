import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { selectAllProjects } from '../store/projects.selectors';
import { projectsNavigation } from '../projects-routing.module';
import { actionProjectsRetrieveAll } from '../store/projects.actions';
import { navigation } from 'src/app/app-routing.module';
import { usersNavigation } from '../../users/users-routing.module';

@Component({
  selector: 'cc-projects',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  navigation = navigation;
  projectsLinks = projectsNavigation;

  projectList$: Observable<Project[]>;

  constructor(private store: Store<AppState>) {
    this.projectList$ = this.store.pipe(select(selectAllProjects));
  }

  ngOnInit(): void {
    this.store.dispatch(actionProjectsRetrieveAll());
  }
}
