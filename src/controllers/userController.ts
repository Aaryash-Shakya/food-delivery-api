import userModel from "../models/userModel";
import { validationResult } from "express-validator";

export class UserController {
    static signup(req, res, next) {
        const errors = validationResult(req);
        const { name, email, password } = req.body;
        if (!errors.isEmpty()) {
            return (
                res
                    .status(400)
                    // map is used to only show the msg property
                    .json({ errors: errors.array().map((x) => x.msg) })
            );
        }
        return res.json({ name, email, password });
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
