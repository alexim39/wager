import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentsService, CountriesInterface } from './contents.service';

@Component({
  selector: 'async-contents',
  template: `
  <async-banner></async-banner>
  <async-why-we-exist></async-why-we-exist>
  <async-intro-video></async-intro-video>
  <async-tab></async-tab>
  `,
})
export class ContentsComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  countries: CountriesInterface[] = [];

  constructor(
    private contentsService: ContentsService
  ) { }

  /* private fetchCountries() {
    this.subscriptions.push(
      this.contentsService.getCountries().subscribe((res) => {
        this.countries = res.data;
        //console.log(this.countries)
      })
    )
  } */

  /* private fetchLeagues() {
    this.subscriptions.push(
      this.contentsService.getLeagues().subscribe((res) => {
        this.countries = res.data;
        //console.log(this.countries)
      })
    )
  } */


  ngOnInit(): void {
    console.log()
    //this.fetchCountries()
    //this.fetchLeagues()
  }

  ngOnDestroy(): void {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
