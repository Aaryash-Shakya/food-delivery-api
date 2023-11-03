export class Utils {
    // generate otp for email verification
    static generateOTP(digit: number = 6) {
        let otp = "";
        for (let i = 0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return parseInt(otp);
    }

    // add times to date
    static generateVerificationTime(base: Date, minutesAdded: number) {
        base.setMinutes(base.getMinutes()+minutesAdded)
        return base
    }
}
