import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import {
  Project,
  ProjectVisibility
} from '../../../shared/models/project.model';
import {
  actionProjectsUpdateOne,
  actionProjectSwitchEditMode
} from '../store/projects.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cc-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEditComponent implements OnInit {
  @Input() project: Project | null = null;

  projectVisibility = ProjectVisibility;

  form = this.fb.group({
    name: ['', Validators.required],
    globalVisibility: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form.patchValue({
      name: this.project?.name,
      globalVisibility: this.project?.globalVisibility
    });
  }

  onEditSwitch() {
    this.store.dispatch(actionProjectSwitchEditMode());
  }

  onSubmit() {
    this.store.dispatch(
      actionProjectsUpdateOne({
        id: this.project?.id ?? '',
        project: {
          ...this.form.value
        }
      })
    );
  }
}
