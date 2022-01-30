import { createReducer, on } from '@ngrx/store';
import { User } from '../../model/user/users.model';
import {
  clearResponseMessages,
  loginUserFailed,
  loginUserSuccess,
  registerUserFailed,
  registerUserSuccess,
  setAuthenticationLoader,
  setUser,
} from '../action/authentication-actions';

export interface AuthenticationInitialState {
  isLoggedIn: boolean;
  user: User | null;
  loginErrorMessage: string;
  loginSuccessMessage: string;
  registerErrorMessage: string;
  registerSuccessMessage: string;
  isLoading: boolean;
}

export const initialState: AuthenticationInitialState = {
  isLoggedIn: false,
  user: null,
  loginErrorMessage: '',
  loginSuccessMessage: '',
  registerErrorMessage: '',
  registerSuccessMessage: '',
  isLoading: false,
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
  on(loginUserSuccess, (state) => ({
    ...state,
    loginSuccessMessage: 'Login Successful !',
  })),
  on(registerUserFailed, (state, { message }) => ({
    ...state,
    registerErrorMessage: message,
  })),
  on(registerUserSuccess, (state) => ({
    ...state,
    registerSuccessMessage:
      'Registeration Successful ! Please Login in to your Account',
  })),
  on(clearResponseMessages, (state) => ({
    ...state,
    loginErrorMessage: '',
    loginSuccessMessage: '',
    registerErrorMessage: '',
    registerSuccessMessage: '',
  })),
  on(setAuthenticationLoader, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  }))
);
