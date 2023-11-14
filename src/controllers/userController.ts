import userModel from "../models/userModel";
import { NodeMailer } from "../utils/nodeMailer";
import { Utils } from "../utils/utils";

export class UserController {
    static async signup(req, res, next) {
        const { name, email, password, phone, type, status } = req.body;

        // check conditions
        try {
            // check if email already exists
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                return next(new Error("Email is already registered"));
            }
        } catch (err) {
            next(err);
        }

        // generate verification OTP
        let verification_token = Utils.generateOTP();
        // post user
        const data = {
            name,
            email,
            verification_token,
            verification_token_time: Utils.generateVerificationTime(
                new Date(),
                5
            ),
            password,
            phone,
            type,
            status,
        };
        const user = new userModel(data);
        user.save()
            .then((user) => {
                // don't send token to frontend client
                // todo: make a separate cluster for token then you can just send the token id without populating it
                // ! this doesn't work
                // delete user.verification_token;

                // note think outside the box if you cant delete it then just override it
                user.verification_token = null;

                // send OPT in email
                NodeMailer.sendEmail({
                    from: "fooddelivery@api.com",
                    to: user.email,
                    subject: "Email Verification",
                    text: `To verify your food delivery api account use the OTP ${verification_token}`,
                    html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify</a>`,
                });

                return res.send(user);

                // note temp solution: it worked before now it doesnt
                // assign the key verification_token to verification_token and rest to userUser
                // const { verification_token, ...newUser } = user;
            })
            .catch((error) => {
                return next(error);
            });

        // note alternative method: remember to put async in function
        /*
        try {
            const user = await userModel(data).save();
            res.send(user);
        } catch (error) {
            next(error);
        }
        */
    }

    static async verifyEmail(req, res, next) {
        const { email, verification_token } = req.body;
        try {
            // todo learn mongodb conditional operators to check all conditions in a single query and update

            // test conditions
            const testUser = await userModel.findOne({
                email: email,
            });

            // check if email is correct
            if (!testUser) {
                throw "Email hasn't been registered";
            }

            // check is email is already verified
            if (testUser.email_verified) {
                throw "Email is already verified";
            }

            // check if verification token has expired
            else if (new Date() > testUser.verification_token_time) {
                throw "Email verification token has expired";
            }

            // update user
            const user = await userModel.findOneAndUpdate(
                {
                    email: email,
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
                res.send(user);
            } else {
                throw "Invalid verification token";
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // for test purposes only
    static test1(req: any, res, next) {
        console.log("test1");
        req.msg = "this is msg of test1";
        next();
    }

    static test2(req, res) {
        console.log("test2");
        res.send("email sent check mailtrap");
    }
}
