import { createReducer, on } from '@ngrx/store';

export interface DashboardInitialState {}

export const initialState: DashboardInitialState = {};

export const DashboardReducer = createReducer(initialState);
