import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, throwError } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  exhaustMap,
  concatMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/common/service/local-storage/local-storage.service';
import { PaginationService } from 'src/app/common/service/pagination/pagination.service';
import { AuthenticationService } from 'src/app/modules/authentication/service/authentication.service';
import { DashboardService } from '../../service/dashboard.service';
import {
  getUsers,
  setDefaultPagination,
  setTotalUsersPages,
  setUsers,
} from '../action/dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private localStorageService: LocalStorageService,
    private paginationService: PaginationService
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
      switchMap((action) =>
        this.dashboardService
          .getAllUsers()
          .pipe(
            mergeMap((usersRes) => [
              setUsers({ users: usersRes.data }),
              setTotalUsersPages({ usersPages: usersRes.total_pages }),
            ])
          )
      )
    )
  );
}
