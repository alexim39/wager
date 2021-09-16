import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LogoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [LogoComponent]
})
export class LogoModule { }
