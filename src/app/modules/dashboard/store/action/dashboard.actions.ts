import { createAction, props } from '@ngrx/store';
import { UserFormType } from '../../enums/formTypeEnum';
import { AddUserReq, editUserReq, User } from '../../model/user/user.model';

export const setDefaultPagination = createAction(
  '[Dashboard] set default pagination',
  props<{ pagination: number }>()
);

export const getUsers = createAction('[Dashboard] get Users');

export const setUsers = createAction(
  '[Dashboard] set Users',
  props<{ users: User[] }>()
);

export const setSelectedUser = createAction(
  '[Dashboard] set Selected user',
  props<{ user: User }>()
);

export const setUserFormType = createAction(
  '[Dashboard] Set Form Type',
  props<{ formType: UserFormType }>()
);

export const setUserError = createAction(
  '[Dashboard] Set Error',
  props<{ error: string }>()
);
export const setSuccess = createAction(
  '[Dashboard] Set Success',
  props<{ success: any }>()
);
export const addUser = createAction(
  '[Dashboard] Add User',
  props<{ user: AddUserReq }>()
);
export const editUser = createAction(
  '[Dashboard] Edit User',
  props<{ user: editUserReq }>()
);
export const findUser = createAction(
  '[Dashboard] Find User',
  props<{ id: string }>()
);
export const deleteUser = createAction(
  '[Dashboard] Delete User',
  props<{ userId: string }>()
);

export const setUserLoader = createAction(
  '[Dashboard] Set Loader',
  props<{ loading: boolean }>()
);

export const setTotalUsersPages = createAction(
  '[Dashboard] Set Total Users',
  props<{ usersPages: number }>()
);
