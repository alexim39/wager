import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteProfileComponent } from './profile-details/delete-profile/delete-profile.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    ProfileDetailsComponent,
    DeleteProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PipesModule,
    RouterModule,
    CoreModule
  ],
  exports: [ProfileDetailsComponent],
  providers: []
})
export class ProfileModule { }