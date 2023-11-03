import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validationResult } from "express-validator";
import { UserValidator } from "../validators/userValidator";

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

        // alternative
        // this.router.get('/login',(req,res)=>UserController.login(req,res))
    }

    postRoutes() {
        this.router.post(
            "/signup",
            UserValidator.signupValidator(),
            UserController.signup
        );
    }

    putRoutes() {}

    patchRoutes() {}

    deleteRoutes() {}
}

export default new UserRouter().router;
