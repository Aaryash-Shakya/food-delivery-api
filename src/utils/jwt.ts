import * as jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";

export class Jwt {
    static verifyJwt(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, getEnvironmentVariables().jwt_secret_key, (err, decoded) => {
                if (err) {
                    reject(err);
                } else if (!decoded) {
                    let error = new Error("User is not authorized");
                    (error as any).errorStatus = 401;
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}
