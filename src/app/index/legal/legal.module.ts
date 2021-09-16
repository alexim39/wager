import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../common/material/material.module';
import { LegalComponent } from './legal.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookiesComponent } from './cookies/cookies.component';

@NgModule({
    declarations: [
       LegalComponent,
       TermsComponent,
       PrivacyComponent,
       CookiesComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      RouterModule,
      FlexLayoutModule
    ],
    providers: []
  })
  export class LegalModule { }