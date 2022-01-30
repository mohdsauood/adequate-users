import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  clearResponseMessages,
  loginUser,
} from '../../store/action/authentication-actions';
import {
  selectLoginErrorMessage,
  selectLoginSuccessMessage,
} from '../../store/selector/authentication.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) {}
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  errorMessage$ = this.store.select(selectLoginErrorMessage);
  successMessage$ = this.store.select(selectLoginSuccessMessage);
  ngOnInit(): void {
    this.store.dispatch(clearResponseMessages());
  }

  onSubmit(): void {
    this.store.dispatch(loginUser(this.userForm.value));
  }
}
