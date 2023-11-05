import userModel from "../models/userModel";
import { validationResult } from "express-validator";
import { Utils } from "../utils/utils";

export class UserController {
    static signup(req, res, next) {
        const { name, email, password, phone, type, status } = req.body;

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
                // res.send(user);

                // note temp solution
                // assign the key verification_token to verification_token and rest to userUser
                const { verification_token, ...newUser } = user;
                res.send(newUser);
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

    static verifyEmail(){

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
