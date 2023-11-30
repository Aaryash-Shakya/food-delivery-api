import { body,query } from "express-validator";
import { Utils } from "../utils/utils";

export class RestaurantValidator {
    static addRestaurantValidator() {
        return [
            body("name", "Owner name is required").isString(),
            body("email", "Owner email is required").isEmail(),
            body("phone", "Phone number is required").isString(),
            body("password", "Password is required")
                .isAlphanumeric()
                .isLength({ min: 8, max: 32 })
                .withMessage("Password must be between 8-32 characters"),
            
            body("res_name", "Restaurant name type is required").isString(),
            body("cover", "Cover image is required").custom((cover, { req }) => {
                if (req.file) {
                    return true;
                } else {
                    Utils.createErrorAndThrow("File not uploaded", 404);
                }
            }),
            body("open_time", "Opening time is required").isString(),
            body("close_time", "Closing time is required").isString(),
            body("price", "Price is required").isString(),
            body("delivery_time", "Delivery time is required").isString(),
            body("status", "Status is required").isString(),
            body("address", "Address is required").isString(),
            body("location", "Location is required").isString(),
            body("cuisines", "Cuisines is required").isString(),
            body("categories", "Categories is required").isString(),
            body("city_id", "City is required").isString(),
        ];
    }

    static getNearbyRestaurantsValidator(){
        return[
            query("lat", "Latitude is required").isNumeric(),
            query("lon", "Longitude is required").isNumeric(),
            query("radius", "Radius is required").isNumeric(),
        ]
    }
}
