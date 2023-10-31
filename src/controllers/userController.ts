export class UserController {
    static login(req, res) {
        res.status(500).send("login unavailable");
    }
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
