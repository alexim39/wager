import { Component } from '@angular/core';

@Component({
  selector: 'async-legal',
  template: `
    <section class="legal" fxLayout="row" fxLayoutAlign="space-between start" fxLayoutGap="3em" fxLayout.xs="column">
      <div class="legal-menu" fxFlex="20" fxFlex.xs="100" fxFlex.md="40">
        <mat-list>
            <mat-list-item> 
                <a [routerLink]="['/legal/terms']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Terms of Service</a>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item> 
                <a [routerLink]="['/legal/privacy']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Privacy Policy</a>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
                <a [routerLink]="['/legal/cookies']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Cookies Policy</a>
            </mat-list-item>
            <mat-divider></mat-divider>
        </mat-list>
      </div>

      <div class="legal-content" fxFlex="80" fxFlex.xs="100" fxFlex.md="60">
          <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styles: [`
    .legal {
      padding: 0 4em;
      .legal-menu {
        width: 100%;
        mat-list {
          mat-list-item {
            a {
              text-decoration: none;
              color: rgb(56, 56, 56);
              font-weight: bold;
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
      .legal-content { }
    }
  `]
})
export class LegalComponent {

  constructor() { }

}
