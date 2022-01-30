import { createReducer, on } from '@ngrx/store';
import { User } from '../../model/user/users.model';
import {
  loginUserFailed,
  registerUserFailed,
  setUser,
} from '../action/authentication-actions';

export interface AuthenticationInitialState {
  isLoggedIn: boolean;
  user: User | null;
  loginErrorMessage: string;
  registerErrorMessage: string;
}

export const initialState: AuthenticationInitialState = {
  isLoggedIn: false,
  user: null,
  loginErrorMessage: '',
  registerErrorMessage: '',
};

export const authenticationReducer = createReducer(
  initialState,
  on(setUser, (state, user) => ({
    ...state,
    user,
    isLoggedIn: true,
    loginErrorMessage: '',
  })),
  on(loginUserFailed, (state, { message }) => ({
    ...state,
    loginErrorMessage: message,
  })),
  on(registerUserFailed, (state, { message }) => ({
    ...state,
    registerErrorMessage: message,
  }))
);
