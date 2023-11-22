export class Utils {
    // generate otp for email verification
    static generateOTP(digit: number = 6) {
        let otp = "";
        for (let i = 0; i < digit; i++) {
            if (i === 0) {
                // first digit can't be zero
                otp += Math.floor(Math.random() * 9 + 1);
            } else {
                otp += Math.floor(Math.random() * 10);
            }
        }
        return parseInt(otp);
    }

    // add times to date
    static generateVerificationTime(base: Date, minutesAdded: number) {
        base.setMinutes(base.getMinutes() + minutesAdded);
        return base;
    }

    static createErrorAndThrow(message: string, status: number): never {
        let err: Error = new Error(message);
        (err as any).errorStatus = status;
        throw err;
    }
}
