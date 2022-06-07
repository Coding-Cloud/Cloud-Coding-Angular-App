import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { socialNavigation } from '../../social/social-routing.module';
import { FormControl } from '@angular/forms';
import { AppState } from '../../../core/core.state';
import { Project } from '../../../shared/models/project.model';
import {
  selectAllProjectsSearch,
  selectProjectsSearchLoading,
  selectProjectsSearchTotalResults
} from '../store/projects.selectors';
import {
  actionProjectsSearch,
  actionProjectsSearchInit
} from '../store/projects.actions';
import { projectsNavigation } from '../projects-routing.module';
import { navigation } from '../../../app-routing.module';

@Component({
  selector: 'cc-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSearchComponent implements OnInit {
  readonly socialNavigation = socialNavigation;
  projectResults$: Observable<Project[]>;
  projectTotalResults$: Observable<number>;
  loading$: Observable<boolean>;
  searchQuery = new FormControl('');

  pageIndex = 0;
  pageSize = 10;

  readonly displayedColumns = ['row'];

  constructor(private store: Store<AppState>, private router: Router) {
    this.projectResults$ = this.store.pipe(select(selectAllProjectsSearch));
    this.projectTotalResults$ = this.store.pipe(
      select(selectProjectsSearchTotalResults)
    );
    this.loading$ = this.store.pipe(select(selectProjectsSearchLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(actionProjectsSearchInit());
    this.store.dispatch(
      actionProjectsSearch({
        limit: this.pageSize,
        page: this.pageIndex
      })
    );
  }

  isInRouteLink(): boolean {
    return this.router.url.includes(socialNavigation.projects.path);
  }

  getRootClasse(): string {
    return this.isInRouteLink() ? 'container' : '';
  }

  onSearch(pageIndex = 0) {
    this.pageIndex = pageIndex;
    const searchValue = this.searchQuery.value.trim();
    this.store.dispatch(
      actionProjectsSearch({
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

  onClick(project: Project) {
    this.router.navigate([
      `${navigation.projets.path}/${projectsNavigation.viewProject.path}`,
      project.id
    ]);
  }
}
