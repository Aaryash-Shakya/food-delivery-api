import userModel from "../models/userModel";

export class UserController {
    static login(req, res, next) {
        // res.status(500).send("login unavailable");

        // (req as any).errorStatus = 500;
        // const error = new Error("error for test purposes");
        // next(error);

        const { email, password } = req.body;

        const user = new userModel({
            // email: email,
            // password: password

            // shortcut
            email,
            password,
        });

        user.save()
            .then((user) => {
                res.status(200).send(user);
            })
            .catch((err) => {
                next(err);
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
