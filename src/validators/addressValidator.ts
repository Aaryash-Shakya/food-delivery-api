import { body } from "express-validator";

export class addressValidator {
    static addAddressValidator() {
        return [
            body("title", "Title is required").isString(),
            body("landmark", "Landmark is required").isString(),
            body("address", "Address is required").isString(),
            body("house", "House no is required").isString(),
            body("latitude", "Latitude is required").isNumeric(),
            body("longitude", "Longitude is required").isNumeric(),
        ];
    }
}
