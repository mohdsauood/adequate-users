import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[Root-store] Loading',
  props<{ loading: boolean }>()
);
