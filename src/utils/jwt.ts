import * as jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";

export class Jwt {
    static verifyJwt(token:string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, getEnvironmentVariables().jwt_secret_key, (err, decoded) => {
                if (err) {
                    reject(err);
                } else if (!decoded) {
                    reject(new Error("User is not authorized"));
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}
