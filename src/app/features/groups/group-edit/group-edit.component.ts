import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Group } from '../../../shared/models/group.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import {
  actionGroupsUpdateOne,
  actionGroupSwitchEditMode
} from '../store/groups.actions';

@Component({
  selector: 'cc-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupEditComponent implements OnInit {
  @Input() group: Group | null = null;

  form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form.patchValue({
      name: this.group?.name
    });
  }

  onEditSwitch() {
    this.store.dispatch(actionGroupSwitchEditMode());
  }

  onSubmit() {
    this.store.dispatch(
      actionGroupsUpdateOne({
        id: this.group?.id ?? '',
        group: {
          ...this.form.value
        }
      })
    );
  }
}
