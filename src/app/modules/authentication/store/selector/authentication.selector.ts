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
