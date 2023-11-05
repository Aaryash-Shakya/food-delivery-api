import userModel from "../models/userModel";
import { Utils } from "../utils/utils";

export class UserController {
    static signup(req, res, next) {
        const { name, email, password, phone, type, status } = req.body;

        // check if email already exists
        userModel
            .findOne({ email: email })
            .then((data) => {
                if (data) {
                    next(new Error("Email is already registered"));
                }
            })
            .catch((err) => {
                next(err);
            });

        const data = {
            name,
            email,
            verification_token: Utils.generateOTP(),
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
                res.send(user);

                // note temp solution: it worked before now it doesnt
                // assign the key verification_token to verification_token and rest to userUser
                // const { verification_token, ...newUser } = user;
            })
            .catch((error) => {
                next(error);
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
            const user = await userModel.findOneAndUpdate(
                {
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: { $gt: Date.now() },
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
                throw new Error("Email Verification token has expired");
            }
        } catch (err) {
            console.log(err);
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
        res.send("test2");
    }
}
