import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";
import userRouter from "./routers/userRouter";

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
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
}
