import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { MaterialModule } from './../common/material/material.module';
import { IndexComponent } from './index.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ContentsComponent } from './contents/contents.component';
import { AnalyserTabModule } from './../analyser-tab/tab.module';
import { LegalModule } from './legal/legal.module';
import { FirmModule } from './firm/firm.module';
import { AuthModule } from '../auth/auth.module';
import { BannerComponent } from './contents/banner/banner.component';
import { TypingComponent } from './contents/banner/typing/typing.component';
import { ContentsService } from './contents/contents.service';
import { CoreModule } from '../core/core.module';
import { LogoModule } from '../logo/logo.module';
import { NavComponent } from './nav/nav.component';
import { IntroVideoComponent } from './contents/intro-video/intro-video.component';
import { WhyWeExistComponent } from './contents/why-we-exist/why-we-exist.component';

@NgModule({
    declarations: [
      IndexComponent,
      ContentsComponent,
      BannerComponent,
      TypingComponent,
      NavComponent,
      IntroVideoComponent,
      WhyWeExistComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      FlexLayoutModule,
      IndexRoutingModule,
      RouterModule,
      AnalyserTabModule,
      LegalModule,
      FirmModule,
      AuthModule,
      CoreModule,
      LogoModule,
    ],
    providers: [ContentsService]
  })
  export class IndexModule { }