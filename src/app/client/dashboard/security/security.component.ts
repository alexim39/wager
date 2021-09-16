import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-security',
  templateUrl: './security.component.html',
  styles: [`
    section {
      mat-accordion {
          mat-expansion-panel {
              mat-expansion-panel-header {
                  mat-panel-title {
                      font-weight: bold;
                      font-family: arial;
                  }
              }
          }
      }
  }
  `]
})
export class SecurityComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']); 
  }


}
