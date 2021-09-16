import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FeedbackService, FeedbackInterface } from './feedback.service';
import { FormResetterService } from '../../../core/form-resetter.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'async-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

    subscriptions: Subscription[] = [];
    feedbackForm: FormGroup;
    isSpinning: boolean = false;

    constructor(
        private snackBar: MatSnackBar,
        private feedbackService: FeedbackService,
        private formResetterService: FormResetterService,
        private titleService: Title,
        private route: ActivatedRoute
    ) { 
        this.titleService.setTitle(this.route.snapshot.data['title']);
    }

    ngOnInit(): void {

        this.feedbackForm = new FormGroup({
            name: new FormControl('', {
                validators:
                    [
                       Validators.required,
                       //Validators.pattern('[A-Za-z]{2,80}')
                    ], updateOn: 'change'
            }),
            email: new FormControl('', {
                validators:
                    [
                       Validators.required,
                       //Validators.pattern('[A-Za-z]{2,80}')
                    ], updateOn: 'change'
            }),
            tellUsAbout: new FormControl('', {
                validators:
                    [
                       Validators.required,
                       //Validators.pattern('[A-Za-z]{2,80}')
                    ], updateOn: 'change'
            }),
            feedbackMsg: new FormControl('', {
                validators:
                    [
                       Validators.required,
                       //Validators.pattern('[A-Za-z]{2,80}'),
                    ], updateOn: 'change'
            }),
            reply: new FormControl(false),
        })
    }

    onSubmit(feedbackObj: FeedbackInterface) {
        this.isSpinning = true;

        // attach the user id
        feedbackObj['userId'] = feedbackObj.name.split(' ').join('_'); // replace space in name with underscore

        // push into list
        this.subscriptions.push(
            this.feedbackService.create(feedbackObj).subscribe((res) => {
                if (res.code === 200) {
                    this.snackBar.open(`${res.msg}`, `Close`, {
                        duration: 4000,
                        panelClass: ['success']
                    });

                    // reset form
                    this.formResetterService.reset(this.feedbackForm);
                    this.isSpinning = false;
                }
            }, (error) => {
                this.snackBar.open(`${error.error.msg}`, `Close`, {
                    duration: 4000,
                    panelClass: ['error']
                });
                this.isSpinning = false;
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
