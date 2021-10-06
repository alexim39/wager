import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../../auth/auth.component';

@Component({
  selector: 'async-banner',
    styles: [`
      header {
      background-size:cover;
      aside {
        background-image: linear-gradient(to left, rgba(9, 173, 151, 0.8) 26.48%, rgba(3, 61, 61, 0.8) 73.52%);
        min-height: 770px;
        text-align: center;
        position: relative;
        height: 100%;
        width: 100%;
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        article {
          margin: auto;
          height: 80vh;
          h1 {
              text-align: center;        
          }
          h3 {
              margin-top: -4em;
          }
          a {
              margin-left: 1em;
          }
        }
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      header {
        margin-bottom: -3em;
        margin-bottom: 1px;
      }
    }
  `],
  template: `
    <section fxLayout="row" fxLayoutAlign="center center">
      <header fxFill>
        <aside>
          <video autoplay muted loop [poster]="posterSource">
            <source [src]="videoSource" type="video/webm">
          </video>

          <article fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="3em">
            <!-- Desktop -->
            <h1 class="mat-display-1" fxHide fxShow.gt-xs>
              Get your bets analysed <br> Or <br> Share your betslip with friends in betting community. 
            </h1>
            <!-- Mobile -->
            <h1 fxHide fxShow.lt-sm>
              Analyse your bets <br> Or <br> Share your betslip with friends.
            </h1>

            <h3 class="typing">
              <async-typing></async-typing>
            </h3>

            <div class="btn">
              <a (click)="openAuthComponent()" mat-raised-button color="accent">GET ACCOUNT</a>
              <a mat-raised-button color="accent" href="#analyser">TRY NOW FOR FREE</a>
            </div>
          </article>

        </aside>
      </header>
    </section>
  `
})
export class BannerComponent {

  posterSource: string = 'assets/img/bck.png';
  videoSource: string = 'assets/video/bck1.webm';

  constructor(
    public dialog: MatDialog
  ) { }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

}
