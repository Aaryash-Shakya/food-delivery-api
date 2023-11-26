import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";
import userRouter from "./routers/userRouter";
import * as bodyParser from "body-parser";

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

        // to parse form encoded
        this.configureBodyParser();
    }

    connectMongoDB() {
        mongoose
            .connect(getEnvironmentVariables().db_uri)
            .then(() => console.log("connected to mongodb"))
            .catch((err) => console.log(err));
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
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
            let errorStatus = (error as any).errorStatus || 500;
            let errorMessage = error.message || "Something went wrong. Please try again later";

            // Handle MongoDB errors
            if (error.name === "MongoError") {
                errorStatus = 500;
            } 
            // Handle JWT errors
            else if (error.name === "JsonWebTokenError") {
                errorStatus = 500;
            } 
            // Handle bcrypt errors
            else if (error.name === "BcryptError") {
                errorStatus = 500;
            }

            console.log(`error occurred: ${error.name} ${error.errorStatus} ${error.message}`);
            console.log(error);
            res.status(errorStatus).json({
                errorName: error.name,
                status: errorStatus,
                message: errorMessage,
            });
        });
    }
}
