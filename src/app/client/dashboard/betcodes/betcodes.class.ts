import { UserInterface } from "src/app/core/user.service";

export class BetcodesClass {

    constructor() {}

    betcodeOwner(betCreator: UserInterface, currentUserId: string): string {
        if (betCreator._id === currentUserId) {
            return 'your bets';
        } else {
            return betCreator.firstname /* + ' ' + betCreator.lastname */;
        }
    }
}