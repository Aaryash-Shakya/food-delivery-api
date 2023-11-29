import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { CityController } from "../controllers/cityController";
import { CityValidator } from "../validators/cityValidator";

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
            "/get-cities",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkError,
            CityController.getCities
        )
    }

    postRoutes() {
        this.router.post(
            "/add-city",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkTypeAdmin,
            CityValidator.addCityValidator(),
            GlobalMiddleware.checkError,
            CityController.addCity
        );
    }
    patchRoutes() {}

    putRoutes() {}

    deleteRoutes() {}
}

export default new RestaurantRouter().router;
