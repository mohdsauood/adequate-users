import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DashboardInitialState } from '../reducer/dashboard.reducer';

export const selectDashboardState =
  createFeatureSelector<DashboardInitialState>('dashboard');

export const selectDashboardisLoading = createSelector(
  selectDashboardState,
  (state) => state.isLoading
);

export const selectFormType = createSelector(
  selectDashboardState,
  (state) => state.formType
);

export const selectUsers = createSelector(
  selectDashboardState,
  (state) => state.users
);

export const selectError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectSuccess = createSelector(
  selectDashboardState,
  (state) => state.success
);
