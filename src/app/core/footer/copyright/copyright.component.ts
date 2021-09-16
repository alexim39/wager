import { Component } from '@angular/core';

@Component({
  selector: 'async-copyright',
  template: `
    <aside fxLayout="row" fxLayoutAlign="space-between center" fxLayout.xs="column">
        <div class="coutesy">
            &copy; 2021 <a [routerLink]="['/']">Async Solutions Ltd.</a> All rights reserved
        </div>
        <div class="tnc">
            <a [routerLink]="['/legal/terms']">Terms</a>
            <a [routerLink]="['/legal/privacy']">Privacy</a>
            <a [routerLink]="['/legal/cookies']">Cookies</a>
        </div>
    </aside>
  `,
  styles: [`
    aside {
        padding: 1em;
        .coutesy {
            a {
                color: inherit;
                text-decoration: none;
                &:hover {
                    color: rgb(161, 161, 161);
                }
            }
        }
        .tnc {
            a {
                color: inherit;
                text-decoration: none;
                margin-left: 1em;
                &:hover {
                    color: rgb(161, 161, 161);
                }
            }
        }
    }
  `]
})
export class CopyrightComponent {

  constructor() { }

}
