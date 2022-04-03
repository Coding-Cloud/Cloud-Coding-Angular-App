import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { FormBuilder, Validators } from '@angular/forms';
import { authNavigation } from '../auth-routing.module';
import { matchPassword } from 'src/app/shared/validator/password';
import { authRegister } from '../../../core/auth/auth.actions';

@Component({
  selector: 'cc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  authLinks = authNavigation;

  form = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pseudo: ['', Validators.required],
      password: ['', [Validators.required]],
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
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
          pseudo: this.form.value.pseudo,
          password: this.form.value.password
        }
      })
    );
  }
}
