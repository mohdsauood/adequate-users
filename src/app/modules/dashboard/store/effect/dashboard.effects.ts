import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of, throwError } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  exhaustMap,
  concatMap,
  switchMap,
  tap,
  finalize,
} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/common/service/local-storage/local-storage.service';
import { PaginationService } from 'src/app/common/service/pagination/pagination.service';
import { AuthenticationService } from 'src/app/modules/authentication/service/authentication.service';
import { clearResponseMessages } from 'src/app/modules/authentication/store/action/authentication-actions';
import { setLoading } from 'src/app/store/action/actions';
import { UserFormType } from '../../enums/formTypeEnum';
import { DashboardService } from '../../service/dashboard.service';
import {
  addUser,
  deleteUser,
  editUser,
  getUsers,
  setDefaultPagination,
  setTotalUsersPages,
  setUserError,
  setUserFormType,
  setUserLoader,
  setUsers,
} from '../action/dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private localStorageService: LocalStorageService,
    private paginationService: PaginationService,
    private store: Store
  ) {}

  setDefaultPagination$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setDefaultPagination),
        switchMap((action) =>
          of(this.paginationService.setToSessionStorage(action))
        )
      ),
    { dispatch: false }
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      tap(() => this.store.dispatch(setUserLoader({ loading: true }))),
      switchMap((action) =>
        this.dashboardService.getAllUsers().pipe(
          mergeMap((usersRes) => [
            setUsers({ users: usersRes.data }),
            setTotalUsersPages({ usersPages: usersRes.total_pages }),
          ]),
          finalize(() => this.store.dispatch(setUserLoader({ loading: false })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      tap(() => this.store.dispatch(setUserLoader({ loading: true }))),
      switchMap((action) =>
        this.dashboardService.addUser(action.user).pipe(
          mergeMap((userRes) => [getUsers()]),

          catchError((error) => [setUserError({ error: error.message })]),
          finalize(() => this.store.dispatch(setUserLoader({ loading: false })))
        )
      )
    )
  );
  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      tap(() => this.store.dispatch(setUserLoader({ loading: true }))),
      switchMap((action) =>
        this.dashboardService.editUser(action.user).pipe(
          mergeMap((userRes) => [
            getUsers(),
            setUserFormType({ formType: UserFormType.ADD }),
          ]),

          catchError((error) => [setUserError({ error: error.message })]),
          finalize(() => this.store.dispatch(setUserLoader({ loading: false })))
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      tap(() => this.store.dispatch(setUserLoader({ loading: true }))),
      switchMap((action) =>
        this.dashboardService.deleteUser(action.userId).pipe(
          mergeMap((userRes) => [getUsers()]),

          catchError((error) => [setUserError({ error: error.message })]),
          finalize(() => this.store.dispatch(setUserLoader({ loading: false })))
        )
      )
    )
  );
}
