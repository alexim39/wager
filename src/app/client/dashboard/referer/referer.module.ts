import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefererComponent, } from './referer.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RefererComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    RefererComponent
  ],
  providers: []
})
export class RefererModule { }
