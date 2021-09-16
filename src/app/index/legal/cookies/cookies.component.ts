import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-cookies',
  templateUrl: './cookies.component.html',
  styles: [`
    .content {
      p {
        text-align: justify;
      }
      ul, ol {
        li {
          margin-bottom: 10px;
          text-align: justify;
        }
      }
    }
  `]
})
export class CookiesComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

}
