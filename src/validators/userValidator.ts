import { body } from "express-validator";

export class UserValidator {
    static signup() {
        return [
            body("email", "Email is required").isEmail(),
            body("password", "Password is required")
                .isLength({ min: 8, max: 32 })
                .custom((value, { req }) => {
                    if (req.body.email) return true;
                    else {
                        throw new Error("Email cannot be empty");
                    }
                }),
        ];
    }
}
