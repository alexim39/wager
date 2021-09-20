import { UserInterface } from "src/app/core/user.service";

export class RateClass {

    numberOfUpRate: number = 0;
    numberOfDownRate: number = 0;

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

    
}