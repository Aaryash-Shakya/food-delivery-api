import {body} from "express-validator"

export class BannerValidator {
    static addBannerValidator() {
        return [
            body("email","email is required")
        ];
    }
}
