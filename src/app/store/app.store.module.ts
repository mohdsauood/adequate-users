import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationEffects } from '../modules/authentication/store/effect/authentication.effects';
import { DashboardEffects } from '../modules/dashboard/store/effect/dashboard.effects';
import { rootReducers } from './reducer/reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([AuthenticationEffects, DashboardEffects]),
  ],
  exports: [StoreModule],
})
export class AppStoreModule {}
