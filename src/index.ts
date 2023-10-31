import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";

let app: express.Application = express();

app.listen(3000, () => {
    console.log("server running at port 3000");
});

mongoose
    .connect(getEnvironmentVariables().db_uri)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err));
