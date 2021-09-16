import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './user.service';
import { FooterComponent } from './footer/footer.component';
import { SocialMedialComponent } from './footer/social-medial/social-medial.component';
import { CopyrightComponent } from './footer/copyright/copyright.component';
import { FormResetterService } from './form-resetter.service';


@NgModule({
  declarations: [FooterComponent, SocialMedialComponent, CopyrightComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [FooterComponent],
  providers: [UserService, FormResetterService]
})
export class CoreModule { }
