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
import { User } from '../../model/user/users.model';
import { AuthenticationService } from '../../service/authentication.service';
import {
  clearResponseMessages,
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
  setAuthenticationLoader,
  setUser,
} from '../action/authentication-actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private store: Store
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      tap(() =>
        this.store.dispatch(setAuthenticationLoader({ loading: true }))
      ),
      switchMap((action) =>
        this.authenticationService.login(action).pipe(
          mergeMap((userRes) => {
            if (userRes.code == 0) {
              this.localStorageService.setUserInLocalStorage({
                $id: userRes.data.$id,
                Id: userRes.data.Id,
                Name: userRes.data.Name,
                Email: userRes.data.Email,
                Token: userRes.data.Token,
              });
              return [
                clearResponseMessages(),
                loginUserSuccess(),
                setUser({
                  $id: userRes.data.$id,
                  Id: userRes.data.Id,
                  Name: userRes.data.Name,
                  Email: userRes.data.Email,
                  Token: userRes.data.Token,
                }),
              ];
            } else {
              return [
                clearResponseMessages(),
                loginUserFailed({ message: userRes.message }),
              ];
            }
          }),
          catchError((error) => [
            clearResponseMessages(),
            loginUserFailed({ message: error.message }),
          ]),
          finalize(() =>
            this.store.dispatch(setAuthenticationLoader({ loading: false }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      tap(() =>
        this.store.dispatch(setAuthenticationLoader({ loading: true }))
      ),
      switchMap((action) =>
        this.authenticationService.register(action).pipe(
          mergeMap((userRes) => {
            if (userRes.code == 0) {
              return [
                clearResponseMessages(),
                registerUserSuccess(),
                setUser({
                  $id: userRes.data.$id,
                  Id: userRes.data.Id,
                  Name: userRes.data.Name,
                  Email: userRes.data.Email,
                  Token: userRes.data.Token,
                }),
              ];
            } else {
              return [
                clearResponseMessages(),
                registerUserFailed({ message: userRes.message }),
              ];
            }
          }),

          catchError((error) => [
            clearResponseMessages(),
            registerUserFailed({ message: error.message }),
          ]),
          finalize(() =>
            this.store.dispatch(setAuthenticationLoader({ loading: false }))
          )
        )
      )
    )
  );
}
