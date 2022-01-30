import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/action/authentication-actions';
import { selectRegisterErrorMessage } from '../../store/selector/authentication.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private store: Store) {}
  registerUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  errorMessage$ = this.store.select(selectRegisterErrorMessage);
  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(registerUser(this.registerUserForm.value));
  }
}
