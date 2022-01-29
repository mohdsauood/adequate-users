import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import {
  loginUser,
  loginUserSuccess,
  setUser,
} from '../action/authentication-actions';
// import { MoviesService } from './movies.service';

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUser),
        exhaustMap((action) =>
          this.authenticationService.login(action).pipe(
            map((user) => [loginUserSuccess(), setUser(user)])
            //   catchError(error => of(AuthApiActions.loginFailure({ error })))
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
}
