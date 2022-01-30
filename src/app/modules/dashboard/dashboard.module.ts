import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/container/dashboard.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardEffects } from './store/effect/dashboard.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [DashboardComponent, UserFormComponent, UsersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
