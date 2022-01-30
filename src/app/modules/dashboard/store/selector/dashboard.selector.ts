import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DashboardInitialState } from '../reducer/dashboard.reducer';

export const selectDashboardState =
  createFeatureSelector<DashboardInitialState>('dashboard');
