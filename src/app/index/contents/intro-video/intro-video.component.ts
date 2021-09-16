import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'async-intro-video',  
  styles: [`
    section {
      height: auto;
      background: #eee;
      .video {        
        height: 35em;
      }
      .comments {
        padding:  10em;   
        div {
          color: #C2185B;
          font-weight: 500;
          font-size: 1.1em;
        }
        h1 {
          margin: 0.8em 0;
          font-size: 3.5em;
        }
        p {
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          font-size: 1.1em;
          text-align: justify;
        }
      }
    }
    @media only screen and (max-width:800px) {
      section {
        .comments {
          padding: 2em;
          h1 {
            margin: 0.5em 0;
            font-size: 1.5em;
          }
        }
      }
    }
    @media only screen and (max-width:500px) {
      section {
        .comments {
          padding: 2em;
          h1 {
            margin: 0.5em 0;
            font-size: 1.5em;
          }
        }
      }
    }
  `],
  template: `
    <section fxLayout="row" fxLayoutAlign="space-between center" fxLayout.xs="column" fxLayout.sm="column">

      <aside class="video" fxFlex="50">
        <img src="./../../../../assets/img/play.jpg">
      </aside>

      <aside class="comments" fxFlex="50">
        <div>BETTING IN A DIGITAL AGE REQUIRE A DIGITAL TOOL</div>
        <h1>See betting differently</h1>
        <p>We're levelling the playing field by giving you access to easy-to-use bet solutions that uses the same analytical tools used by Bookmakers.</p>
      </aside>

    </section>
  `
})
export class IntroVideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console
  }

}
