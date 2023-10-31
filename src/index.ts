import { Server } from "./server";

const server = new Server().app;
const port = 3000;

server.listen(3000, () => {
    console.log(`server running at port ${port}`);
});
