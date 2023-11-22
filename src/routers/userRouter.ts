import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserValidator } from "../validators/userValidator";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";

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
        this.router.get("/test", GlobalMiddleware.authorization, UserController.test1);

        // alternative
        // this.router.get('/login',(req,res)=>UserController.login(req,res))
    }

    postRoutes() {
        this.router.post(
            "/signup",
            UserValidator.signupValidator(),
            GlobalMiddleware.checkError,
            UserController.signup
        );
        this.router.post("/login", UserValidator.loginValidator(), GlobalMiddleware.checkError, UserController.login);
    }

    putRoutes() {}

    patchRoutes() {
        this.router.patch(
            "/verify-email",
            UserValidator.verifyEmailValidator(),
            GlobalMiddleware.checkError,
            UserController.verifyEmail
        );
        this.router.patch(
            "/resend-verification-token",
            UserValidator.resendVerificationTokenValidator(),
            GlobalMiddleware.checkError,
            UserController.resendVerificationToken
        );
    }

    deleteRoutes() {}
}

export default new UserRouter().router;
