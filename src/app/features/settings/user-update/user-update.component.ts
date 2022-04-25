import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import {
  actionSettingsSwitchUserEdit,
  actionSettingsUpdateUser,
  actionSettingsUpdateUserPassword
} from '../../../core/settings/settings.actions';
import { matchPassword } from '../../../shared/validator/password';
import { subYears } from 'date-fns';

@Component({
  selector: 'cc-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserUpdateComponent implements OnInit {
  @Input() user: User | null = null;
  maxDate = subYears(new Date(), 12);

  form = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    birthdate: [this.maxDate, Validators.required]
  });

  passwordForm = this.fb.group(
    {
      password: ['', []],
      confirmPassword: ['', []]
    },
    {
      validators: matchPassword('password', 'confirmPassword')
    }
  );

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form.patchValue({
      ...this.user
    });
  }

  onEditSwitch() {
    this.store.dispatch(actionSettingsSwitchUserEdit());
  }

  onSubmit() {
    this.store.dispatch(
      actionSettingsUpdateUser({
        form: { ...this.form.value }
      })
    );
    if (this.passwordForm.value.password.length > 0) {
      this.store.dispatch(
        actionSettingsUpdateUserPassword({
          form: { password: this.passwordForm.value.password }
        })
      );
    }
  }
}
