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

    getRoutes() {
        this.router.get(
            "/get-nearby-restaurants",
            GlobalMiddleware.authorization,
            RestaurantValidator.getNearbyRestaurantsValidator(),
            GlobalMiddleware.checkError,
            RestaurantController.getNearbyRestaurants
        );
        this.router.get(
            "/search-nearby-restaurants",
            GlobalMiddleware.authorization,
            RestaurantValidator.searchNearbyRestaurantsValidator(),
            GlobalMiddleware.checkError,
            RestaurantController.searchNearbyRestaurants
        );
        this.router.get(
            "/get-restaurants",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkTypeAdmin,
            GlobalMiddleware.checkError,
            RestaurantController.getRestaurants
        );
    }

    postRoutes() {
        this.router.post(
            "/add-restaurant",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkTypeAdmin,
            new Multer().pMulter.single("cover"),
            RestaurantValidator.addRestaurantValidator(),
            GlobalMiddleware.checkError,
            RestaurantController.addRestaurant
        );
    }

    patchRoutes() {}

    putRoutes() {}

    deleteRoutes() {}
}

export default new RestaurantRouter().router;
