import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";
import userRouter from "./routers/userRouter";

export class Server {
    
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();

        // initialize all routes
        this.setRoutes();

        // if route not found above rest are handled by handle404Error
        this.handle404Error();

        // only accessed when a route redirects to it by calling next(error:Error)
        this.handleErrors();
    }

    setConfiguration() {
        this.connectMongoDB();
    }

    connectMongoDB() {
        mongoose
            .connect(getEnvironmentVariables().db_uri)
            .then(() => console.log("connected to mongodb"))
            .catch((err) => console.log(err));
    }

    setRoutes() {
        this.app.use("/api/user", userRouter);
    }

    handle404Error() {
        this.app.use((req, res) => {
            res.status(404).json({
                status: 404,
                message: "Not Found",
            });
        });
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = (req as any).errorStatus || 500;
            console.log(`error occurred: ${errorStatus}`)
            res.status(errorStatus).json({
                status: errorStatus,
                message:
                    error.message ||
                    "Something went wrong. Please try again later",
            });
        });
    }
}
