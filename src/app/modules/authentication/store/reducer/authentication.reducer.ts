import { createReducer, on } from '@ngrx/store';
import { User } from '../../model/user/users.model';
import { loginUserFailed, setUser } from '../action/authentication-actions';

export interface AuthenticationInitialState {
  isLoggedIn: boolean;
  user: User | null;
  loginErrorMessage: string;
}

export const initialState: AuthenticationInitialState = {
  isLoggedIn: false,
  user: null,
  loginErrorMessage: '',
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
  }))
);
