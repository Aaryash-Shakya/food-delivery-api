import { body, param } from "express-validator";

export class CategoryValidator {
    static getRestaurantCategoryValidator() {
        param("res_id", "Restaurant id is required");
    }
}
