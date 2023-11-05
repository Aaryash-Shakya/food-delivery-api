import { validationResult } from "express-validator";

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
}
