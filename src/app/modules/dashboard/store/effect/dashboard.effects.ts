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
import { AuthenticationService } from 'src/app/modules/authentication/service/authentication.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) {}
}
