import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { RestaurantController } from "../controllers/restaurantController";
import { RestaurantValidator } from "../validators/restaurantValidator";
import { Multer } from "../utils/multer";

class RestaurantRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {}

    postRoutes() {
        this.router.post(
            "add-restaurant",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkTypeAdmin,
            new Multer().pMulter.single('cover'),
            RestaurantValidator.addRestaurantValidator(),
            GlobalMiddleware.checkError,
            RestaurantController.addRestaurant,
        )
    }

    patchRoutes() {}

    putRoutes() {}

    deleteRoutes() {}
}

export default new RestaurantRouter().router;
