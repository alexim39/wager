import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-firm',
  template: `
    <section class="firm" fxLayout="row" fxLayoutAlign="space-between start" fxLayoutGap="3em" fxLayout.xs="column">
      <div class="firm-menu" fxFlex="20">
        <mat-list>
            <mat-list-item> 
            <a [routerLink]="['/firm/about']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">About App</a>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item> 
                <a [routerLink]="['/firm/feedback']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Send Feedback</a>
            </mat-list-item>
            <mat-divider></mat-divider>
        </mat-list>
      </div>

      <div class="firm-content" fxFlex="80">
          <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styles: [`
    .firm {
      padding: 0 4em;
      .firm-menu {
      width: 100%;
        mat-list {
          mat-list-item {
            a {
              text-decoration: none;
              color: rgb(56, 56, 56);
              font-weight: bold;
              cursor: pointer;
            }
            a:hover {
              color: rgb(151, 149, 149);
            }
            a.active {
              color: rgb(151, 149, 149);
            }
          }
        }
      }
      .firm-content { }
    }
  `]
})
export class FirmComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }


}
