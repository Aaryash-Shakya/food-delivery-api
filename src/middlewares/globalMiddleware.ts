import { validationResult } from "express-validator";
import { Jwt } from "../utils/jwt";

export class GlobalMiddleware {
    static checkError(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
            // return (
            //     res
            //         .status(400)
            //         // map is used to only show the msg property
            //         .json({ errors: errors.array().map((x) => x.msg) })
            // );
        } else {
            next();
        }
    }

    static async authorization(req, res, next) {
        const header_auth = req.headers.authorization;
        // bearer <token>
        const token = header_auth ? header_auth.slice(7) : null;
        // alternative
        // const token = header_auth.split(' ')[1]
        try {
            const decoded = await Jwt.verifyJwt(token);
            req.decoded = decoded;
            next();
        } catch (err) {
            next(err);
        }
    }
}
