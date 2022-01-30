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
import { AuthenticationService } from '../../service/authentication.service';
import {
  clearResponseMessages,
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
  setUser,
} from '../action/authentication-actions';
// import { MoviesService } from './movies.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        this.authenticationService.login(action).pipe(
          mergeMap((userRes) => {
            if (userRes.code == 0) {
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
          ])
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
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
          ])
        )
      )
    )
  );
}
