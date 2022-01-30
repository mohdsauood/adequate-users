import { createReducer, on } from '@ngrx/store';
import { setLoading } from 'src/app/store/action/actions';
import { UserFormType } from '../../enums/formTypeEnum';
import { User } from '../../model/user/user.model';
import {
  addUser,
  setSelectedUser,
  setSuccess,
  setTotalUsersPages,
  setUserError,
  setUserFormType,
  setUserLoader,
  setUsers,
} from '../action/dashboard.actions';

export interface DashboardInitialState {
  selectedUser: User | null;
  formType: UserFormType;
  isLoading: boolean;
  users: User[] | null;
  error: string | null;
  success: string | null;
  totalUsersPages: number | null;
}

export const initialState: DashboardInitialState = {
  selectedUser: null,
  formType: UserFormType.ADD,
  isLoading: false,
  users: null,
  error: null,
  success: null,
  totalUsersPages: null,
};

export const DashboardReducer = createReducer(
  initialState,
  on(setUsers, (state, { users }) => ({
    ...state,
    users,
  })),
  on(setUserFormType, (state, { formType }) => ({
    ...state,
    formType,
  })),
  on(setUserFormType, (state, { formType }) => ({
    ...state,
    formType,
  })),
  on(setUserError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(setSuccess, (state, { success }) => ({
    ...state,
    success,
  })),
  on(setUserLoader, (state, { loading }) => ({
    ...state,
    isLoading: loading,
  })),
  on(setTotalUsersPages, (state, { usersPages }) => ({
    ...state,
    totalUsersPages: usersPages,
  })),
  on(setSelectedUser, (state, { user }) => ({
    ...state,
    selectedUser: user,
  }))
);
