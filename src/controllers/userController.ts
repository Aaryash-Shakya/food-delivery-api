import { getEnvironmentVariables } from "../environments/environment";
import userModel from "../models/userModel";
import { NodeMailer } from "../utils/nodeMailer";
import { Utils } from "../utils/utils";
import { Bcrypt } from "../utils/bcrypt";
import * as jwt from "jsonwebtoken";

export class UserController {
    static async signup(req, res, next) {
        let { name, email, password, phone, type, status } = req.body;
        let hashed_password;
        try {
            // check conditions
            // check if email already exists
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                Utils.createErrorAndThrow("Email is already registered", 409); // conflict
            }
            hashed_password = await Bcrypt.encryptPassword(password);
            // generate verification OTP
            let verification_token = Utils.generateOTP();
            // post user
            const data = {
                name,
                email,
                verification_token,
                verification_token_time: Utils.generateVerificationTime(new Date(), 5),
                password: hashed_password,
                phone,
                type,
                status,
            };
            let user = new userModel(data);
            user = await user.save();

            // create jwt token
            const payload = {
                userId: user._id,
                email: user.email,
            };
            const token = jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
                expiresIn: "1h", // 1 hour
            });

            // don't send token to frontend client
            // todo: make a separate cluster for token then you can just send the token id without populating it
            // ! this doesn't work -> delete user.verification_token;

            // note think outside the box if you cant delete it then just override it
            user.verification_token = null;

            // send OPT in email
            NodeMailer.sendEmail({
                from: "fooddelivery@api.com",
                to: user.email,
                subject: "Email Verification",
                text: `To verify your food delivery api account use the OTP ${verification_token}`,
                html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${verification_token}</a>`,
            });

            return res.status(200).json({
                message: "Account Created. Verify your email.",
                token: token,
                user: user,
            });
        } catch (err) {
            next(err);
        }
    }

    static async verifyEmail(req, res, next) {
        const { email, verification_token } = req.body;
        try {
            // todo learn mongodb conditional operators to check all conditions in a single query and update

            // test conditions
            const testUser = await userModel.findOne({
                email: email,
            });

            // check if email exists
            if (!testUser) {
                Utils.createErrorAndThrow("Email not registered", 404); // email not found
            }

            // check is email is already verified
            if (testUser.email_verified) {
                Utils.createErrorAndThrow("Email already verified", 400); // bad request
            }

            // check if verification token has expired
            else if (new Date() > testUser.verification_token_time) {
                Utils.createErrorAndThrow("Email verification token expired", 401); // unauthorized
            }

            // check if verification token is correct
            else if (verification_token != testUser.verification_token) {
                Utils.createErrorAndThrow("Invalid Verification Token", 401); // unauthorized
            }

            // update user
            const user = await userModel.findOneAndUpdate(
                {
                    email: email,
                    // use verification_token as well for extra security
                    verification_token: verification_token,
                    // verification_token_time: { $gt: Date.now() },
                },
                {
                    email_verified: true,
                },
                {
                    new: true,
                }
            );
            if (user) {
                res.status(200).json({ message: "Your email has been verified successfully" });
            } else {
                Utils.createErrorAndThrow("Failed to verify user", 500);
            }
        } catch (err) {
            next(err);
        }
    }

    static async resendVerificationToken(req, res, next) {
        const email = req.body.email;
        try {
            const testUser = await userModel.findOne({ email: email });

            // test conditions
            // check if email is correct
            if (!testUser) {
                Utils.createErrorAndThrow("Email not registered", 404); // email not found
            }

            // check if email is already verified
            else if (testUser.email_verified === true) {
                Utils.createErrorAndThrow("Email already verified", 400); // bad request
            }

            // generate new token and update time
            const newVerificationToken = Utils.generateOTP();
            const newVerificationTime = Utils.generateVerificationTime(new Date(), 5);

            // update user
            const updatedUser = await userModel.findOneAndUpdate(
                { email: email },
                {
                    verification_token: newVerificationToken,
                    verification_token_time: newVerificationTime,
                },
                {
                    new: true,
                }
            );

            // send OPT in email
            await NodeMailer.sendEmail({
                from: "fooddelivery@api.com",
                to: updatedUser.email,
                subject: "Resend Email Verification",
                text: `To verify your food delivery api account use the OTP ${updatedUser.verification_token}`,
                html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${updatedUser.verification_token}</a>`,
            });

            return res.status(200).json({ message: "Verification email resent successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            let user = await userModel.findOne({ email: email });

            // test condition
            // check if user exists
            if (!user) {
                Utils.createErrorAndThrow("Account not found", 404);
            }

            // check if user email is verified
            if (!user.email_verified) {
                Utils.createErrorAndThrow("Email not Verified", 401); // unauthorized
            }

            // check password is correct
            const checkPassword = await Bcrypt.comparePassword(password, user.password);
            if (checkPassword !== true) {
                Utils.createErrorAndThrow(checkPassword, 401); // forbidden
            }

            // generate new jwt token
            const payload = {
                userId: user._id,
                email: user.email,
            };
            const token = jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
                expiresIn: "1h", // 1 hour
            });

            // send response
            res.status(200).json({
                message: "login successful",
                token: token,
                user: user,
            });
        } catch (err) {
            next(err);
        }
    }

    // for test purposes only
    static test1(req, res, next) {
        console.log("test1");
        res.send(req.decoded)
    }

    static test2(req, res) {
        console.log("test2");
        res.send("email sent check mailtrap");
    }
}
