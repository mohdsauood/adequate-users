import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rootReducers } from './reducer/reducer';

@NgModule({
  imports: [StoreModule.forRoot(rootReducers), EffectsModule.forRoot([])],
  exports: [StoreModule],
})
export class AppStoreModule {}
