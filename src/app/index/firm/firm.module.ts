import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutAppComponent } from './about-app/about-app-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/common/material/material.module';
import { FirmComponent } from './firm.component';
import { RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AboutAppComponent,
    FirmComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FirmModule { }
