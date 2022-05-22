import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import {
  actionUsersGetOne,
  actionUsersGetUserProjects
} from '../store/users.actions';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { Project } from '../../../../shared/models/project.model';
import {
  selectUserView,
  selectUserViewProjects
} from '../store/users.selectors';
import { usersNavigation } from '../users-routing.module';
import { projectsNavigation } from '../../../projects/projects-routing.module';
import { navigation } from '../../../../app-routing.module';

@Component({
  selector: 'cc-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  userId = '';
  user$: Observable<User>;
  projects$: Observable<Project[]>;

  usersNavigation = usersNavigation;
  projectsLinks = projectsNavigation;
  rootLinks = navigation;
  projectViewLink = `/${this.rootLinks.projets.path}/${this.projectsLinks.viewProject.path}`;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(selectUserView));
    this.projects$ = this.store.pipe(select(selectUserViewProjects));
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(actionUsersGetOne({ id: this.userId }));
    this.store.dispatch(actionUsersGetUserProjects({ id: this.userId }));
  }
}
