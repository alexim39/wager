import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileDetailsInterface, ProfileDetailsService } from './profile-details.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'async-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss', './profile-details.mobile.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  profileForm: FormGroup;
  user: UserInterface;
  isActive: boolean;
  imagePath: string = `./../../../assets/img/profile.jpg`;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private profileDetailsService: ProfileDetailsService,
    private titleService: Title,
    private route: ActivatedRoute
  ) { 
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }


  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        this.isActive = this.user.isActive;

        this.profileForm = new FormGroup({
          firstname: new FormControl(this.user.firstname, {
            validators:
              [
                Validators.required,
                Validators.pattern('[A-Za-z]{2,80}')
              ], updateOn: 'change'
          }),
          lastname: new FormControl(this.user.lastname, {
            validators:
              [
                Validators.required,
                Validators.pattern('[A-Za-z]{2,80}'),
                //this.ageValidator
              ], updateOn: 'change'
          }),
          email: new FormControl(this.user.email.toLowerCase(), {
            validators:
              [
                Validators.required,
                Validators.email
              ], updateOn: 'change'
          }),
          phone: new FormControl(this.user.phone, {
            validators:
              [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                //Validators.pattern('[0-9]{1,11}'),
              ], updateOn: 'change'
          }),
          about: new FormControl(this.user.about, {
            validators:
              [
                //Validators.required,
                //Validators.pattern('[A-Za-z]{2,50}'),
                Validators.maxLength(100),
              ], updateOn: 'change'
          }),
        })
      })
    )

  }

  onSubmit(profile: ProfileDetailsInterface) {
    // add user id
    profile['userId'] = this.user._id;

    // push into list
    this.subscriptions.push(
      this.profileDetailsService.updateProfile(profile).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )

  }

  

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
