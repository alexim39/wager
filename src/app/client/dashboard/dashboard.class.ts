export class DashboardClass { // UserDashboardClass is technically user class

    constructor() {}
  
    // generate transaction id
    protected generateTransactionId (): number { // Generate unique random numbers as investmntId using the passed in current time seconds
      return 1 + Math.floor(Math.random() * 999999999);
    }
}  