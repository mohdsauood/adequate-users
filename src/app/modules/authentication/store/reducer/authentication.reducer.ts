import { createReducer, on } from '@ngrx/store';
import { User } from '../../model/user/users.model';
import { setUser } from '../action/authentication-actions';

export interface AuthenticationInitialState {
  isLoggedIn: boolean;
  user: User | null;
}

export const initialState: AuthenticationInitialState = {
  isLoggedIn: false,
  user: null,
};

export const authenticationReducer = createReducer(
  initialState,
  on(setUser, (state, user) => ({
    ...state,
    user,
  }))
);
