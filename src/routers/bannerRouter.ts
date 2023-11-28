import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { BannerValidator } from "../validators/bannerValidator";
import { BannerController } from "../controllers/bannerController";
import { Multer } from "../utils/multer";

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

    getRoutes() {}
    postRoutes() {
        this.router.post(
            "/add-banner",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkTypeAdmin,
            new Multer().pMulter.single("banner"),
            BannerValidator.addBannerValidator(),
            GlobalMiddleware.checkError,
            BannerController.addBanner
        );
    }
    patchRoutes() {}
    putRoutes() {}
    deleteRoutes() {}
}

export default new BannerRouter().router;
