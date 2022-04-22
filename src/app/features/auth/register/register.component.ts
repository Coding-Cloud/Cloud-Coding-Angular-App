import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { FormBuilder, Validators } from '@angular/forms';
import { authNavigation } from '../auth-routing.module';
import { matchPassword } from 'src/app/shared/validator/password';
import { authRegister } from '../../../core/auth/auth.actions';
import { subYears } from 'date-fns';

@Component({
  selector: 'cc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  authLinks = authNavigation;
  maxDate = subYears(new Date(), 12);

  form = this.fb.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      birthdate: [this.maxDate, Validators.required],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: matchPassword('password', 'confirmPassword')
    }
  );

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onRegisterClick() {
    this.store.dispatch(
      authRegister({
        userForm: {
          firstname: this.form.value.firstname,
          lastname: this.form.value.lastname,
          email: this.form.value.email,
          username: this.form.value.username,
          password: this.form.value.password,
          birthdate: this.form.value.birthdate
        }
      })
    );
  }
}
