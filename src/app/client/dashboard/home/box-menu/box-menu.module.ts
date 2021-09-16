import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxMenuComponent } from './box-menu.component';
import { PipesModule } from './../../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { BoxMenuService } from './box-menu.service';
import { MonthlyProgressComponent } from './monthly-progress/monthly-progress.component';


@NgModule({
  declarations: [
    BoxMenuComponent,
    MonthlyProgressComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [BoxMenuComponent],
  providers: [UserService, BoxMenuService]
})
export class BoxMenuModule { }
