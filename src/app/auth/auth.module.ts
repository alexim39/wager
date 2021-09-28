import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from './../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { SigninDialogComponent } from './signin-dialog/signin-dialog.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ActivationComponent } from './activation/activation.component';
import { AuthService } from './auth.service';
import { RefSignupComponent } from './ref-signup/ref-signup.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignupDialogComponent,
    SigninDialogComponent,
    SigninComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ActivationComponent,
    RefSignupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: [AuthService]
})
export class AuthModule { }
