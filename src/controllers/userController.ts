import userModel from "../models/userModel";
import { validationResult } from "express-validator";

export class UserController {
    static signup(req, res, next) {
        const errors = validationResult(req);
        const { name, email, password, phone, type, status } = req.body;
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
            // return (
            //     res
            //         .status(400)
            //         // map is used to only show the msg property
            //         .json({ errors: errors.array().map((x) => x.msg) })
            // );
        }

        const data = {
            name,
            email,
            password,
            phone,
            type,
            status,
        };

        const user = new userModel(data);

        user.save()
            .then((user) => {
                res.send(user);
            })
            .catch((error) => {
                next(error);
            });
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
