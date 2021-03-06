import { createAction, props } from '@ngrx/store';
import { LoginUser, RegisterUser, User } from '../../model/user/users.model';

export const registerUser = createAction(
  '[Authentication] Register User',
  props<RegisterUser>()
);

export const registerUserSuccess = createAction(
  '[Authentication] Register User Success'
);

export const registerUserFailed = createAction(
  '[Authentication] Register User Failed',
  props<{ message: string }>()
);

export const loginUser = createAction(
  '[Authentication] Login User',
  props<LoginUser>()
);

export const loginUserSuccess = createAction(
  '[Authentication] Login User Success'
);

export const loginUserFailed = createAction(
  '[Authentication] Login User Failed',
  props<{ message: string }>()
);

export const setUser = createAction(
  '[Authentication] Set Logged In User',
  props<User>()
);

export const clearResponseMessages = createAction(
  '[Authentication] Clear Response Messages'
);

export const setAuthenticationLoader = createAction(
  '[Authentication] set authentication loader',
  props<{ loading: boolean }>()
);
