import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';
import { ReportService } from './resport.service';

@Component({
  selector: 'async-report',
  template: `
    <p>
      report works!
    </p>
  `,
  styles: [
  ]
})
export class ReportComponent implements OnInit {

  subscriptions: Subscription[] = [];
  foundUserProfile: UserInterface


  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    
  }

}
