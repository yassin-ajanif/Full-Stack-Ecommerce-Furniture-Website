export class UserToken {
    // The constructor receives the token string and expiration date as a string
    constructor(public token: string, public tokenExpiresIn: Date) {}

    // Method to check if the token is expired
    isExpired(): boolean {
        // Get the current date and compare with the expiration date
        const currentDate = new Date();
        return currentDate > this.tokenExpiresIn;
    }
}


