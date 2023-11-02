import { Router } from "express";
import { UserController } from "../controllers/userController";

class UserRouter {
    // make public to access from server
    public router: Router;

    constructor() {
        // create router
        this.router = Router();

        // initialize all routes for user
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        // for testing middleware
        this.router.get("/test", UserController.test1, UserController.test2);

        this.router.post("/login", UserController.login);
        // alternative
        // this.router.get('/login',(req,res)=>UserController.login(req,res))
    }

    postRoutes() {}

    putRoutes() {}

    patchRoutes() {}

    deleteRoutes() {}
}

export default new UserRouter().router;
