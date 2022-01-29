import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './store/effect/authentication.effects';

import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
})
export class AuthenticationModule {}
