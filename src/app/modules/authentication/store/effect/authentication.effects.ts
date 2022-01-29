import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import {
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  setUser,
} from '../action/authentication-actions';
// import { MoviesService } from './movies.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUser),
        exhaustMap((action) =>
          this.authenticationService.login(action).pipe(
            map((userRes) =>
              userRes.code == 0
                ? [
                    loginUserSuccess(),
                    setUser({
                      $id: userRes.data.$id,
                      Id: userRes.data.Id,
                      Name: userRes.data.Name,
                      Email: userRes.data.Email,
                      Token: userRes.data.Token,
                    }),
                  ]
                : loginUserFailed({ message: userRes.message })
            ),
            catchError((error) => [loginUserFailed({ message: error.message })])
          )
        )
      ),
    { dispatch: false }
  );
}
