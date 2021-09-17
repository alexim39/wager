import { BetcodesInterface } from '../../../betcodes/betcodes.service';

export class MonthlyProgressClass {

    constructor() {}

    currentMonthWinsPercentage(betcodes: BetcodesInterface[]): number {
        // get current month
        const currentMonth = new Date().getMonth();
        // get currrent year
        const currentYear = new Date().getFullYear();

        const currentMonthsCodes: BetcodesInterface[] = [];
        const numberOfWonBets: BetcodesInterface[] = [];

        betcodes.forEach((betcode) => {
            // get the end month
            const endMonth = new Date(betcode.endDate).getMonth()
            // get the end month
            const endYear = new Date(betcode.endDate).getFullYear()

            // add betcode with current month into array
            if (currentMonth == endMonth && currentYear == endYear) {
                currentMonthsCodes.push(betcode)
            }
        })

        // get the number of won bets for the current month
        currentMonthsCodes.forEach((code) => {
            if (code.outcome == 'won') {
                numberOfWonBets.push(code)
            }
        })
        // percentage of won games
        return (numberOfWonBets.length / currentMonthsCodes.length ) * 100;
    }

    currentMonthLosedPercentage(betcodes: BetcodesInterface[]): number {
        // get current month
        const currentMonth = new Date().getMonth();
        // get currrent year
        const currentYear = new Date().getFullYear();

        const currentMonthsCodes: BetcodesInterface[] = [];
        const numberOfLosedBets: BetcodesInterface[] = [];

        betcodes.forEach((betcode) => {
            // get the end month
            const endMonth = new Date(betcode.endDate).getMonth()
            // get the end month
            const endYear = new Date(betcode.endDate).getFullYear()

            // add betcode with current month into array
            if (currentMonth == endMonth && currentYear == endYear) {
                currentMonthsCodes.push(betcode)
            }
        })

        // get the number of won bets for the current month
        currentMonthsCodes.forEach((code) => {
            if (code.outcome == 'lose') {
                numberOfLosedBets.push(code)
            }
        })
        // percentage of won games
        return (numberOfLosedBets.length / currentMonthsCodes.length ) * 100;
    }

    currentMonthOtherOutcomePercentage(betcodes: BetcodesInterface[]): number {
        // get current month
        const currentMonth = new Date().getMonth();
        // get currrent year
        const currentYear = new Date().getFullYear();

        const currentMonthsCodes: BetcodesInterface[] = [];
        const numberOfOtherOutcomesBets: BetcodesInterface[] = [];

        betcodes.forEach((betcode) => {
            // get the end month
            const endMonth = new Date(betcode.endDate).getMonth()
            // get the end month
            const endYear = new Date(betcode.endDate).getFullYear()

            // add betcode with current month into array
            if (currentMonth == endMonth && currentYear == endYear) {
                currentMonthsCodes.push(betcode)
            }
        })

        // get the number of won bets for the current month
        currentMonthsCodes.forEach((code) => {
            if (code.outcome !== 'won' && code.outcome !== 'lose') {
                numberOfOtherOutcomesBets.push(code)
            }
        })
        // percentage of won games
        return (numberOfOtherOutcomesBets.length / currentMonthsCodes.length ) * 100;
    }

}