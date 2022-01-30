import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import {
  AuthenticationInitialState,
  authenticationReducer,
} from 'src/app/modules/authentication/store/reducer/authentication.reducer';
import {
  DashboardInitialState,
  DashboardReducer,
} from 'src/app/modules/dashboard/store/reducer/dashboard.reducer';
import { setLoading } from '../action/actions';

export interface RootInitialState {
  authentication: AuthenticationInitialState;
  dashboard: DashboardInitialState;
}

// TODO : remove or implement common state if necessary
// export const initialState: RootInitialState = {
//   // loading: false,
//   authentication: null,
// };

// export const rootReducers = createReducer(
//   initialState,
//   on(setLoading, (state, { loading }) => ({
//     ...state,
//     loading,
//   }))
// );

export const rootReducers: ActionReducerMap<RootInitialState> = {
  authentication: authenticationReducer,
  dashboard: DashboardReducer,
};
