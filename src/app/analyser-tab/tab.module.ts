import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleOddComponent } from './single-odd/single-odd.component';
import { DoubleOddComponent } from './double-odd/double-odd.component';
import { TabComponent } from './tab.component';
import { TrippleOddComponent } from './tripple-odd/tripple-odd.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { GameMarginDialogComponent } from './game-margin-dialog/game-margin-dialog.component';
import { TeamsFormComponent } from './tripple-odd/teams-form/teams-form.component';
import { TabService } from './tab.service';
import { SupposedOddDialogComponent } from './tripple-odd/teams-form/supposed-odd-dialog/supposed-odd-dialog.component';
import { HeadToHeadComponent } from './tripple-odd/teams-form/head-to-head/head-to-head.component';
import { ResentMatchesComponent } from './tripple-odd/teams-form/resent-matches/resent-matches.component';
import { VeiwPredictionComponent } from './tripple-odd/teams-form/veiw-prediction/veiw-prediction.component';

@NgModule({
  declarations: [
    TabComponent,
    SingleOddComponent,
    DoubleOddComponent,
    TrippleOddComponent,
    GameMarginDialogComponent,
    TeamsFormComponent,
    SupposedOddDialogComponent,
    HeadToHeadComponent,
    ResentMatchesComponent,
    VeiwPredictionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [TabComponent],
  providers: [TabService]
})
export class AnalyserTabModule { }