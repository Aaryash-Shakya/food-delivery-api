import { body } from "express-validator";
import { Utils } from "../utils/utils";
import restaurantModel from "../models/restaurantModel";
import categoryModel from "../models/categoryModel";

export class ItemValidator {
    static addItemValidator() {
        return [
            body("restaurant_id", "Restaurant ID is required")
                .isString()
                .custom((restaurant_id, { req }) => {
                    return restaurantModel
                        .findById(restaurant_id)
                        .then((restaurant) => {
                            if (restaurant) {
                                return true;
                            } else {
                                Utils.createErrorAndThrow("Restaurant doesn't exist", 400);
                            }
                        })
                        .catch((err) => {
                            throw err;
                        });
                }),
            body("category_id", "Category ID is required")
                .isString()
                .custom((category_id, { req }) => {
                    return categoryModel
                        .findOne({ _id: category_id, restaurant_id: req.body.restaurant_id })
                        .then((category) => {
                            if (category) {
                                return true;
                            } else {
                                Utils.createErrorAndThrow("Category doesn't exist", 400);
                            }
                        })
                        .catch((err) => {
                            throw err;
                        });
                }),
            body("name", "Name is required").isString(),
            body("description", "Description is required").isString().optional(),
            body("price", "Price is required").isNumeric().optional(),
            body("diet", "Dietary category is required").isString(),
            body("item_image", "Item image is required").custom((image, { req }) => {
                if (req.file) {
                    return true;
                } else {
                    Utils.createErrorAndThrow("File not uploaded", 404);
                }
            }),
        ];
    }
}
