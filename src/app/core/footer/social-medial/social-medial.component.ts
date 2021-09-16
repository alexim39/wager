import { Component } from '@angular/core';

interface LanguagesInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'async-social-medial',
  template: `
    <aside fxLayout="row" fxLayoutAlign="center center" >
      <div fxFlex="80" fxLayout="row" fxLayoutAlign="space-around center" fxLayout.sm="column" fxLayout.xs="column" fxLayoutGap.xs="1em">
        <div class="language">
          <mat-form-field>
            <mat-label>Language</mat-label>
            <mat-select [(value)]="selectedLanguage">
              <mat-option [value]="language.value" *ngFor="let language of languages">{{ language.viewValue }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="links">
          <a [routerLink]="['/']">Home</a>
          <a [routerLink]="['/firm/about']">About us</a>
          <a [routerLink]="['#']">Blog</a>
          <a [routerLink]="['#']">Help</a>
        </div>

        <div class="socials">
          <a href="https://chat.whatsapp.com/E0PWtXGhRQC50R7JzvseEl" target="_blanck" title="Whatsapp">
            <mat-icon class="whatsapp">whatsapp</mat-icon>
          </a>
          <!-- <a [routerLink]="['#']" title="Facebook">
            <mat-icon class="facebook">facebook</mat-icon>
          </a> -->
        </div>
      </div>
    </aside>
  `,
  styles: [`
    aside {
      min-height: 8em;
      padding: 1em 0;
      background: #eee;
      .links {
        a {
            color: teal;
            font-size: 1em;
            padding-right: 2em;
            text-decoration: none;
            font-family: tahoma;
            font-weight: bold;
            text-transform: uppercase;
            &:hover {
              color: rgb(161, 161, 161);
              
            }
        }
      }
      .socials {
        a {
          padding-right: 1em;
          &:hover {
            opacity: 0.5;
          }
        }
        .facebook {
          color: #4267B2;
        }
        .whatsapp {
          color: #075e54;
        }
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      aside {
        padding: 1em 0;
      }
    }
  `]
})
export class SocialMedialComponent {

  languages: LanguagesInterface[] = [
    {value: 'eng', viewValue: 'English'}
  ];
  selectedLanguage = this.languages[0].value;

  constructor() { }

}
