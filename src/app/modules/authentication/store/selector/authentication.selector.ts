import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../model/user/users.model';
import { AuthenticationInitialState } from '../reducer/authentication.reducer';

export const selectAuthenticationState =
  createFeatureSelector<AuthenticationInitialState>('authentication');

export const selectIsLoggedIn = createSelector(
  selectAuthenticationState,
  (state) => state.isLoggedIn
);

export const selectUser = createSelector(
  selectAuthenticationState,
  (state) => state.user
);

export const selectLoginErrorMessage = createSelector(
  selectAuthenticationState,
  (state) => state.loginErrorMessage
);

export const selectRegisterErrorMessage = createSelector(
  selectAuthenticationState,
  (state) => state.registerErrorMessage
);
