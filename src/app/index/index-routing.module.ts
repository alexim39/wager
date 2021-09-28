import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationComponent } from '../auth/activation/activation.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from '../auth/new-password/new-password.component';
import { RefSignupComponent } from '../auth/ref-signup/ref-signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { ContentsComponent } from './contents/contents.component';
import { AboutAppComponent } from './firm/about-app/about-app-dialog.component';
import { FeedbackComponent } from './firm/feedback/feedback.component';
import { FirmComponent } from './firm/firm.component';
import { IndexComponent } from './index.component';
import { CookiesComponent } from './legal/cookies/cookies.component';
import { LegalComponent } from './legal/legal.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { TermsComponent } from './legal/terms/terms.component';

const routes: Routes = [
  { path: '', component: IndexComponent,
    children: [
      { path: '', component: ContentsComponent },
      { path: 'legal', component: LegalComponent,
        children: [
          { path: '', component: TermsComponent, data: {title: 'Terms of service policy'}  },
          { path: 'terms', component: TermsComponent, data: {title: 'Terms of service policy'}  },
          { path: 'privacy', component: PrivacyComponent, data: {title: 'Privacy policy'}  },
          { path: 'cookies', component: CookiesComponent, data: {title: 'Cookies policy'}  },
        ]
      },
      { path: 'firm', component: FirmComponent,
        children: [
          { path: '', component: AboutAppComponent, data: {title: 'About Wager application'}  },
          { path: 'about', component: AboutAppComponent, data: {title: 'About Wager application'}  },
          { path: 'feedback', component: FeedbackComponent, data: {title: 'Send us your feedbacks'}  }
        ]
      },
      { path: 'signin', component: SigninComponent, data: {title: 'Account signin'}  },
      { path: 'signup/:userId', component: ActivationComponent, data: {title: 'Account activation'}  },
      { path: 'signup/r/:userId', component: RefSignupComponent, data: {title: 'User account sign up - referer'}  },
      { path: 'fp', component: ForgotPasswordComponent, data: {title: 'Reset your account password'} },
      { path: 'new-password/:userId', component: NewPasswordComponent, data: {title: 'New account password'}  },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
