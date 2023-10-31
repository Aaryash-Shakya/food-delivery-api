import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";
import { Server } from "./server";

const server = new Server().app;
const port = 3000;

server.listen(3000, () => {
    console.log(`server running at port ${port}`);
});
