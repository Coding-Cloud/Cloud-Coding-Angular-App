import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ProjectLanguage,
  ProjectVisibility
} from '../../../shared/models/project.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { actionProjectsAddOneCustom } from '../store/projects.actions';

@Component({
  selector: 'cc-project-add-custom',
  templateUrl: './project-add-custom.component.html',
  styleUrls: ['./project-add-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddCustomComponent {
  projectLanguage = ProjectLanguage;
  projectVisibility = ProjectVisibility;

  form = this.fb.group({
    name: ['', Validators.required],
    repositoryUrl: ['', Validators.required],
    language: [this.projectLanguage.ANGULAR, Validators.required],
    visibility: [this.projectVisibility.PRIVATE, Validators.required]
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  onSubmit() {
    this.store.dispatch(
      actionProjectsAddOneCustom({
        project: {
          name: this.form.value.name,
          language: this.form.value.language,
          link: this.form.value.repositoryUrl,
          globalVisibility: this.form.value.visibility
        }
      })
    );
  }
}
