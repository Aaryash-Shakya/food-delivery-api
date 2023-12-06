import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { Multer } from "../utils/multer";
import { ItemController } from "../controllers/itemController";
import { ItemValidator } from "../validators/itemValidator";

class BannerRouter {
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
            "/get-items",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkError,
            ItemController.getItems
        );
    }

    postRoutes() {
        this.router.post(
            "/add-item",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkTypeAdmin,
            new Multer().pMulter.single("item_image"),
            ItemValidator.addItemValidator(),
            GlobalMiddleware.checkError,
            ItemController.addItem
        );
    }
    patchRoutes() {}
    putRoutes() {}
    deleteRoutes() {}
}

export default new BannerRouter().router;
