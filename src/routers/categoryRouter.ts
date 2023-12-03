import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { CategoryController } from "../controllers/categoryController";
import { CategoryValidator } from "../validators/categoryValidator";

class CategoryRouter {
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
            "/get-categories",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkError,
            CategoryController.getCategories
        );

        this.router.get(
            "/get-restaurant-categories/:res_id",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkError,
            // CategoryValidator.getRestaurantCategoryValidator(),
            CategoryController.getRestaurantCategories
        );
    }

    postRoutes() {}
    patchRoutes() {}
    putRoutes() {}
    deleteRoutes() {}
}

export default new CategoryRouter().router;
