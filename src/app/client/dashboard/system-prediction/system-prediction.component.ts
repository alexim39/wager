import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-system-prediction',
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <li>Game predictions</li>
        <li>system prediction</li>
      </ul>
    </div>

    <section>
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [`
    section {
    }
  `]
})
export class SystemPredictionComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']); 
  }


}
