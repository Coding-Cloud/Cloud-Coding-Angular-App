import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { groupsNavigation } from '../groups-routing.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { FormBuilder, Validators } from '@angular/forms';
import { actionGroupsAddOne } from '../store/groups.actions';

@Component({
  selector: 'cc-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupAddComponent implements OnInit {
  groupsLinks = groupsNavigation;

  form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.store.dispatch(
      actionGroupsAddOne({
        group: {
          name: this.form.value.name
        }
      })
    );
  }
}
