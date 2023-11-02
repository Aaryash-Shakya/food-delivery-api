export class UserController {
    static login(req, res, next) {
        // res.status(500).send("login unavailable");

        // (req as any).errorStatus = 500;
        // const error = new Error("error for test purposes");
        // next(error);

        res.send(req.params);
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
