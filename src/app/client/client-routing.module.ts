import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabComponent } from '../analyser-tab/tab.component';
import { AuthGuard } from '../auth/auth.guard';
import { BetcodesComponent } from './dashboard/betcodes/betcodes.component';
import { RegularMemberFormComponent } from './dashboard/betcodes/uploader/regular-member-form/regular-member-form.component';
import { RegularMemberUpdateComponent } from './dashboard/betcodes/uploader/regular-member-update/regular-member-update.component';
import { UploaderComponent } from './dashboard/betcodes/uploader/uploader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackComponent } from './dashboard/feedback/feedback.component';
import { YearlyGraphComponent } from './dashboard/home/box-menu/yearly-graph/yearly-graph.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileDetailsComponent } from './dashboard/profile/profile-details/profile-details.component';
import { RefererComponent } from './dashboard/referer/referer.component';
import { PasswordComponent } from './dashboard/security/password/password.component';
import { SecurityComponent } from './dashboard/security/security.component';
import { SystemPredictionComponent } from './dashboard/system-prediction/system-prediction.component';
import { ReportComponent } from './dashboard/user-profile/report/report.component';
import { UserProfileHomeComponent } from './dashboard/user-profile/user-profile-home/user-profile-home.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, data: {title: 'Wager - User dashboard'} },
      { path: 'system-prediction', component: SystemPredictionComponent, data: {title: 'System analytics and prediction'},
        children: [ { path: '', component: TabComponent } ]
      },
      { path: 'betcodes', component: BetcodesComponent, data: {title: 'Weekly prediction betcodes'} },
      { path: 'betcodes-mgt', component: UploaderComponent, data: {title: 'Betcode management page'},
        children: [
          { path: '', component: RegularMemberFormComponent },
          { path: 'update', component: RegularMemberUpdateComponent, data: {title: 'Regular member code Update'} },
        ]
      },
      { path: 'profile', component: ProfileDetailsComponent, data: {title: 'User profile details'} },
      { path: 'security',
        children: [
          { path: '', component: SecurityComponent, data: {title: 'User profile security tips'} },
          { path: 'password', component: PasswordComponent, data: {title: 'User profile password change'} }
        ]
      },
      { path: 'feedback', component: FeedbackComponent, data: {title: 'User feedback'} },
      { path: 'yearly-progress-graph', component: YearlyGraphComponent, data: {title: 'Weekly prediction yearly graph'} },
      { path: 'referer', component: RefererComponent, data: {title: 'Friend referer page'} },
      /* The uri should alwayb be the last */
      { path: ':username', component: UserProfileComponent, data: {title: 'User profile page'},
        children: [
          { path: '', component: UserProfileHomeComponent },
          { path: 'report', component: ReportComponent, data: {title: 'User behaviour report page'} },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
