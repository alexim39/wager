import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader/uploader.component';
import { BetcodesService } from './betcodes.service';
import { BetcodesComponent } from './betcodes.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { RegularMemberUpdateComponent } from './uploader/regular-member-update/regular-member-update.component';
import { RegularMemberFormComponent } from './uploader/regular-member-form/regular-member-form.component';
import { UpdaterDialogComponent } from './uploader/regular-member-update/updater-dialog/updater-dialog.component';


@NgModule({
  declarations: [
    UploaderComponent,
    BetcodesComponent,
    RegularMemberUpdateComponent,
    RegularMemberFormComponent,
    UpdaterDialogComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [UploaderComponent],
  providers: [BetcodesService]
})
export class BetcodesModule { }
