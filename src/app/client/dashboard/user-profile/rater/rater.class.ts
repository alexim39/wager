import { UserInterface } from "src/app/core/user.service";
import { UserBetcodesAndProfileInterface } from "../user-profile.service";

export class RateClass {

    numberOfUpRate: number = 0;
    numberOfDownRate: number = 0;
    rating: number = 0;

    constructor() {}

    ratedUp(users: UserInterface, currentUserId: string): boolean {
        const u: UserInterface[] = []

        users.rateups.forEach((user) => {
            if (user._id === currentUserId) {
                u.push(user)
            }
        })

        // get number of up rate
        this.numberOfUpRate = users.rateups.length;

        // check is user is found
        if (u.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    ratedDwon(users: UserInterface, currentUserId: string): boolean {
        const u: UserInterface[] = []

        users.ratedowns.forEach((user) => {
            if(user._id === currentUserId) {
                u.push(user)
            }
        })

        // get number of down rate
        this.numberOfDownRate = users.ratedowns.length;

        // check is user is found
        if (u.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    userRating(userBetcodes: UserBetcodesAndProfileInterface[]) {
        const wonbets: UserBetcodesAndProfileInterface[] = [];
        //const losebets: UserBetcodesAndProfileInterface[] = [];

        userBetcodes.forEach((bet) => {
            if (bet.outcome === 'won') {
                wonbets.push(bet)
            }
           /*  if (bet.outcome === 'lose') {
                losebets.push(bet)
            }  */           
        })
        this.rating = +((wonbets.length / userBetcodes.length) * 100).toFixed(0);
    }

    
}