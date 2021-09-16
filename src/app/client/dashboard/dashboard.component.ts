import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ServerResponse } from './../../common/server/response.interface';
import { Router } from '@angular/router';
import { UserInterface, UserService } from './../../core/user.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'async-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  currentUser: UserInterface;
  deviceXs: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.currentUser = user;
      }, (error) => {
        // reroute to home page
        this.router.navigate(['/']);
      })
    );

    // push into list
    this.subscriptions.push(
      // Media observer
      this.mediaObserver.media$.subscribe((device: MediaChange) => {
        this.deviceXs = device.mqAlias === 'xs' ? true : false;
      })
    )
  }

  signOut(): void {
    this.authService.signOut().subscribe((res: ServerResponse) => {
      if (res.code === 200) {
        localStorage.removeItem('token')
        // reroute to home page
        this.router.navigate(['/']);
      }
    }, (error) => {
      console.error(error);
    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
