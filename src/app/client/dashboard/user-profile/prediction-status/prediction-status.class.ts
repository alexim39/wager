import { UserProfileAndBetcodesInterface } from "../user-profile.service";

export class PredictionStatusClass {

    constructor() {}

    userWins(betcodes: UserProfileAndBetcodesInterface[]) {
        const totalBetcodes: number = betcodes.length;
        const wonBetcodes: UserProfileAndBetcodesInterface[] = []

        betcodes.forEach((betcode) => {
            if (betcode.outcome === 'won') {
                wonBetcodes.push(betcode)
            }
        })

        return wonBetcodes.length / totalBetcodes
    }

    userLose (betcodes: UserProfileAndBetcodesInterface[]) {
        const totalBetcodes: number = betcodes.length;
        const loseBetcodes: UserProfileAndBetcodesInterface[] = []

        betcodes.forEach((betcode) => {
            if (betcode.outcome === 'lose') {
                loseBetcodes.push(betcode)
            }
        })

        return loseBetcodes.length / totalBetcodes
    }

    userOtherOutcomes (betcodes: UserProfileAndBetcodesInterface[]) {
        const totalBetcodes: number = betcodes.length;
        const otherBetcodes: UserProfileAndBetcodesInterface[] = []

        betcodes.forEach((betcode) => {
            if (betcode.outcome !== 'won' && betcode.outcome !== 'lose') {
                otherBetcodes.push(betcode)
            }
        })

        return otherBetcodes.length / totalBetcodes
    }

    // Set Progress Bar Width
    protected getProgressBarWidth(val: number): any {
        // get odd implied probabilty
        if (val >= 1) {
            if (val >= 1 && val <= 25 ) return { 'w-25': true };
            if (val > 25 && val <= 50 ) return { 'w-50': true };
            if (val > 50 && val <= 75 ) return { 'w-75': true };
            if (val > 75 && val <= 100 ) return { 'w-100': true };
        }
    }
} 