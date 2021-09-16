import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'async-uploader',
  styles: [`
    .menu {
      height: inherit;
      background: whitesmoke;
      h1 {
        text-align: center;
        background: #eee;
        padding: 0.3em 0;
      }
      a {
        color: black;
        display: block;
        padding: 12px;
        text-decoration: none;
        &:hover {
          background-color: #ccc;
        }
      }
      a.active {
        background-color: teal;
        color: white;
      }
    }
  `],
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <!-- <li>My subscriptions</li> -->
        <li>code management</li>
      </ul>
    </div>

    <div fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutGap="1em">
      <section class="menu" fxFlex="20">
        <!-- <mat-card> -->
          <h1>Menu</h1>

          <a mat-list-item [routerLink]="['/dashboard/cd']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
            <span mat-line>CODE UPLOAD</span>
          </a>
          <a mat-list-item [routerLink]="['/dashboard/cd/rmu']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
            <span mat-line>CODE UPDATE</span>
          </a>
        <!-- </mat-card> -->
      </section>

      <section fxFlex="80">
        <router-outlet></router-outlet>
      </section>
    </div>
  `
})
export class UploaderComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) { 
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

}
