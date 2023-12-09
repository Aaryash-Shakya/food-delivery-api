import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { AddressController } from "../controllers/addressController";
import { addressValidator } from "../validators/addressValidator";

class AddressRouter {
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
            "/get-addresses",
            GlobalMiddleware.authorization,
            GlobalMiddleware.checkError,
            AddressController.getAddresses
        );
    }

    postRoutes() {
        this.router.post('/add-address',
        GlobalMiddleware.authorization,
        addressValidator.addAddressValidator(),
        GlobalMiddleware.checkError,
        AddressController.addAddress)
    }
    patchRoutes() {}

    putRoutes() {}

    deleteRoutes() {}
}

export default new AddressRouter().router;
