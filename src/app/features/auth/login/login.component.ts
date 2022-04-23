import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { authLogin } from '../../../core/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { authNavigation } from '../auth-routing.module';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  authLinks = authNavigation;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]]
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onLoginClick() {
    this.store.dispatch(
      authLogin({
        username: this.form.value.username,
        password: this.form.value.password
      })
    );
  }
}
