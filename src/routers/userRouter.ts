import { Router } from "express";
import { UserController } from "../controllers/userController";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get("/test", UserController.test1, UserController.test2);

        this.router.get("/login", UserController.login, UserController.test2);
        // alternative
        // this.router.get('/login',(req,res)=>UserController.login(req,res))
    }

    postRoutes() {}

    putRoutes() {}

    patchRoutes() {}

    deleteRoutes() {}
}

export default new UserRouter().router;
