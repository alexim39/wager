import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientRoutingModule } from './client-routing.module';
import { LogoModule } from '../logo/logo.module';
import { SidenavListComponent } from './dashboard/sidenav/sidenav-list.component';
import { SidenavMenuComponent } from './dashboard/sidenav/menu/menu.component';
import { CoreModule } from './../core/core.module';
import { HomeComponent } from './dashboard/home/home.component';
import { AccountActivationComponent } from './dashboard/home/account-activation/account-activation.component';
import { AnalyserTabModule } from '../analyser-tab/tab.module';
import { SystemPredictionComponent } from './dashboard/system-prediction/system-prediction.component';
import { ProfileModule } from './dashboard/profile/profile.module';
import { SecurityModule } from './dashboard/security/security.module';
import { PipesModule } from '../common/pipes/pipes.module';
import { FeedbackModule } from './dashboard/feedback/feedback.module';
import { BoxMenuModule } from './dashboard/home/box-menu/box-menu.module';
import { BetcodesModule } from './dashboard/betcodes/betcodes.module';


@NgModule({
  declarations: [
    DashboardComponent, 
    SidenavListComponent, 
    SidenavMenuComponent, 
    HomeComponent,
    AccountActivationComponent,
    SystemPredictionComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ClientRoutingModule,
    LogoModule,
    CoreModule,
    AnalyserTabModule,
    ProfileModule,
    SecurityModule,
    PipesModule,
    FeedbackModule,
    BoxMenuModule,
    BetcodesModule,
  ],
  providers: []
})
export class ClientModule { }
