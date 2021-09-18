import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    UserProfileComponent
  ],
  providers: []
})
export class UserProfileModule { }
