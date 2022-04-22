import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { projectsNavigation } from '../projects-routing.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ProjectLanguage,
  ProjectVisibility
} from '../../../shared/models/project.model';
import { actionProjectsAddOne } from '../store/projects.actions';

@Component({
  selector: 'cc-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddComponent implements OnInit {
  projectsLinks = projectsNavigation;
  projectLanguage = ProjectLanguage;
  projectVisibility = ProjectVisibility;

  form = this.fb.group({
    name: ['', Validators.required],
    language: [this.projectLanguage.ANGULAR, Validators.required],
    visibility: [this.projectVisibility.PRIVATE, Validators.required]
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.group(this.form.value);
    this.store.dispatch(
      actionProjectsAddOne({
        project: {
          name: this.form.value.name,
          language: this.form.value.language,
          globalVisibility: this.form.value.visibility
        }
      })
    );
  }
}
