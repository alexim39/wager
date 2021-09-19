import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PredictionStatusComponent } from './prediction-status/prediction-status.component';
import { ChartsModule } from 'ng2-charts';
import { RiskLevelComponent } from './prediction-status/risk-level/risk-level.component';
import { SportKnowledgeComponent } from './prediction-status/sport-knowledge/sport-knowledge.component';
import { RaterComponent } from './rater/rater.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    PredictionStatusComponent,
    RiskLevelComponent,
    SportKnowledgeComponent,
    RaterComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ChartsModule
  ],
  exports: [
    UserProfileComponent
  ],
  providers: []
})
export class UserProfileModule { }
